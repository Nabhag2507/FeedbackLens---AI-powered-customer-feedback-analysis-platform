import json
import requests
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
from src import config
import os

try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

class FeedbackAnalyzer:
    def __init__(self, model_path: str = config.HF_MODEL_REPO):
        self.sia = SentimentIntensityAnalyzer()
        self.threshold = config.CONFIDENCE_THRESHOLD
        
        print(f"Connecting to Hugging Face Serverless API: {model_path}...")
        self.api_url = f"https://api-inference.huggingface.co/models/{model_path}"
        
        # Will look for HF_TOKEN or HF_KEY in environment
        token = os.getenv("HF_TOKEN") or os.getenv("HF_KEY")
        self.headers = {"Authorization": f"Bearer {token}"} if token else {}

    def get_sentiment(self, text: str) -> str:
        scores = self.sia.polarity_scores(text)
        compound = scores['compound']
        if compound >= 0.05: return "positive"
        elif compound <= -0.05: return "negative"
        else: return "neutral"

    def get_category_and_confidence(self, text: str):
        try:
            # Add wait_for_model to handle cold starts in production
            payload = {
                "inputs": text,
                "options": {"wait_for_model": True}
            }
            response = requests.post(self.api_url, headers=self.headers, json=payload)
            if response.status_code != 200:
                print(f"API Error: {response.text}")
                return "other", 0.0
                
            predictions = response.json()
            if isinstance(predictions, list) and len(predictions) > 0 and isinstance(predictions[0], list):
                # HF API returns list of lists: [[{'label': 'praise', 'score': 0.9}, ...]]
                top_pred = predictions[0][0]
                category = top_pred.get("label", "other")
                confidence = top_pred.get("score", 0.0)
                
                # Fallback mapping if HF returns LABEL_0 instead of the actual string
                if category.startswith("LABEL_"):
                    try:
                        label_id = int(category.split("_")[1])
                        category = config.ID_TO_LABEL.get(label_id, "other")
                    except ValueError:
                        pass
                
                if confidence < self.threshold:
                    category = "Other"
                    
                return category.lower(), round(confidence, 2)
            else:
                return "other", 0.0
        except Exception as e:
            print(f"Request failed: {e}")
            return "other", 0.0

    def analyze(self, text: str) -> str:
        sentiment = self.get_sentiment(text)
        category, confidence = self.get_category_and_confidence(text)
        
        result = {
            "sentiment": sentiment,
            "category": category,
            "confidence": confidence
        }
        return json.dumps(result, indent=4)
