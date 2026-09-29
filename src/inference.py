import json
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
from src import config
import os
from transformers import pipeline

try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

class FeedbackAnalyzer:
    def __init__(self, model_path=config.HF_MODEL_REPO):
        self.sia = SentimentIntensityAnalyzer()
        self.threshold = config.CONFIDENCE_THRESHOLD
        
        print(f"Downloading/Loading model {model_path} from Hugging Face...")
        token = os.getenv("HF_TOKEN") or os.getenv("HF_KEY")
        self.classifier = pipeline("text-classification", model=model_path, tokenizer=model_path, token=token)

    def get_sentiment(self, text: str) -> str:
        scores = self.sia.polarity_scores(text)
        compound = scores['compound']
        if compound >= 0.05: return "positive"
        elif compound <= -0.05: return "negative"
        else: return "neutral"

    def get_category_and_confidence(self, text: str):
        try:
            result = self.classifier(text)[0]
            category = result["label"]
            confidence = result["score"]
            
            # Fallback mapping if HF returns LABEL_0 instead of the actual string
            if category.startswith("LABEL_"):
                try:
                    label_id = int(category.split("_")[1])
                    category = config.ID_TO_LABEL.get(label_id, "other")
                except ValueError:
                    pass
            
            if confidence < self.threshold:
                category = "other"
                
            return category.lower(), round(confidence, 2), None
        except Exception as e:
            print(f"Request failed: {e}")
            return "other", 0.0, str(e)

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
