import json
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
from src import config
import os

# Download VADER lexicon if not already present
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

class FeedbackAnalyzer:
    def __init__(self, model_path: str = config.HF_MODEL_REPO):
        """
        Initializes VADER and downloads the fine-tuned classifier from Hugging Face.
        """
        self.sia = SentimentIntensityAnalyzer()
        self.threshold = config.CONFIDENCE_THRESHOLD
        
        print(f"Downloading/Loading model from Hugging Face: {model_path}...")
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
        self.model.eval() # Set to evaluation mode
        print("Model loaded successfully!")
        self.is_mock = False

    def get_sentiment(self, text: str) -> str:
        """
        Uses VADER to classify text as positive, negative, or neutral.
        """
        scores = self.sia.polarity_scores(text)
        compound = scores['compound']
        
        if compound >= 0.05:
            return "positive"
        elif compound <= -0.05:
            return "negative"
        else:
            return "neutral"

    def get_category_and_confidence(self, text: str):
        """
        Uses the fine-tuned Transformer model to predict the category.
        Applies the probability threshold.
        """
        if self.is_mock:
            # Dummy output if model isn't downloaded yet
            return "mock_category", 0.99
            
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=config.MAX_LENGTH)
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            
        # Get probabilities using softmax
        logits = outputs.logits
        probs = torch.nn.functional.softmax(logits, dim=-1)
        
        # Get the max probability and its index
        confidence, predicted_idx = torch.max(probs, dim=1)
        confidence = confidence.item()
        predicted_idx = predicted_idx.item()
        
        # Get the label name
        category = self.model.config.id2label[predicted_idx]
        
        # Apply threshold logic
        if confidence < self.threshold:
            category = "Other"
            
        return category.lower(), round(confidence, 2)

    def analyze(self, text: str) -> str:
        """
        Analyzes the text and returns a JSON formatted string exactly as required.
        """
        sentiment = self.get_sentiment(text)
        category, confidence = self.get_category_and_confidence(text)
        
        result = {
            "sentiment": sentiment,
            "category": category,
            "confidence": confidence
        }
        
        return json.dumps(result, indent=4)

if __name__ == "__main__":
    # Test the pipeline
    analyzer = FeedbackAnalyzer()
    
    test_texts = [
        "The app crashed when I tried to update my profile. Terrible experience.",
        "Can you add a dark mode feature? That would be awesome.",
        "I absolutely love this new update, the UI is so clean!"
    ]
    
    for t in test_texts:
        print(f"\nInput: {t}")
        print(analyzer.analyze(t))
