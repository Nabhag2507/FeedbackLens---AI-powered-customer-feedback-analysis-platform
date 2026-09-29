import json
import requests
import time
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
from src import config
import os

try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

class FeedbackAnalyzer:
    def __init__(self, model_path=config.HF_MODEL_REPO):
        self.sia = SentimentIntensityAnalyzer()
        self.threshold = config.CONFIDENCE_THRESHOLD
        
        self.api_url = f"https://api-inference.huggingface.co/models/{model_path}"
        token = os.getenv("HF_TOKEN") or os.getenv("HF_KEY")
        self.headers = {"Authorization": f"Bearer {token}"} if token else {}
        print("Initialized API FeedbackAnalyzer (with robust retries).")

    def get_sentiment(self, text: str) -> str:
        scores = self.sia.polarity_scores(text)
        compound = scores['compound']
        if compound >= 0.05: return "positive"
        elif compound <= -0.05: return "negative"
        else: return "neutral"

    def get_category_and_confidence(self, text: str):
        payload = {
            "inputs": text,
            "options": {"wait_for_model": True}
        }
        
        max_retries = 5
        for attempt in range(max_retries):
            try:
                response = requests.post(self.api_url, headers=self.headers, json=payload, timeout=30)
                if response.status_code != 200:
                    print(f"API Error (Attempt {attempt+1}): {response.text}")
                    # If 503, model is still loading, wait and retry
                    if response.status_code == 503:
                        time.sleep(3)
                        continue
                    return "other", 0.0, response.text
                    
                predictions = response.json()
                if isinstance(predictions, list) and len(predictions) > 0 and isinstance(predictions[0], list):
                    top_pred = predictions[0][0]
                    category = top_pred.get("label", "other")
                    confidence = top_pred.get("score", 0.0)
                    
                    if category.startswith("LABEL_"):
                        try:
                            label_id = int(category.split("_")[1])
                            category = config.ID_TO_LABEL.get(label_id, "other")
                        except ValueError:
                            pass
                    
                    if confidence < self.threshold:
                        category = "Other"
                        
                    return category.lower(), round(confidence, 2), None
                else:
                    return "other", 0.0, f"Unexpected format: {predictions}"
            except Exception as e:
                print(f"Request failed on attempt {attempt+1}: {e}")
                time.sleep(2) # Wait before retry on DNS/Connection error
        
        return "other", 0.0, "Max retries exceeded due to network errors."

    def analyze(self, text: str) -> str:
        sentiment = self.get_sentiment(text)
        category, confidence, error = self.get_category_and_confidence(text)
        
        result = {
            "sentiment": sentiment,
            "category": category,
            "confidence": confidence
        }
        if error:
            result["debug_error"] = error
            
        return json.dumps(result, indent=4)
