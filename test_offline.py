import os
from src import config
from transformers import pipeline

class OfflineAnalyzer:
    def __init__(self, model_path="models/category_model"):
        print(f"Loading local offline model from {model_path}...")
        self.classifier = pipeline("text-classification", model=model_path, tokenizer=model_path)
        
    def analyze(self, text):
        result = self.classifier(text)[0]
        # Map LABEL_X if necessary
        category = result["label"]
        confidence = result["score"]
        
        if category.startswith("LABEL_"):
            try:
                label_id = int(category.split("_")[1])
                category = config.ID_TO_LABEL.get(label_id, "other")
            except ValueError:
                pass
                
        if confidence < config.CONFIDENCE_THRESHOLD:
            category = "other"
            
        return {
            "category": category.lower(),
            "confidence": round(confidence, 2)
        }

def test_offline():
    analyzer = OfflineAnalyzer()
    
    test_inputs = [
        "This app is working super fine, everything is properly connected and working smoothly!",
        "How do I create a new access token?",
        "I found a super bug, whenever I click the submit button the app crashes.",
        "Could you add a dark mode feature in the next update?"
    ]
    
    print("\n--- Starting Offline Tests ---\n")
    for text in test_inputs:
        print(f"Input: \"{text}\"")
        result = analyzer.analyze(text)
        print(f"Output: {result}\n")

if __name__ == "__main__":
    test_offline()
