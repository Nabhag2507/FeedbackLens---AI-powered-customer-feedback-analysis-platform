import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from src.inference import FeedbackAnalyzer

def test_model():
    print("Initializing FeedbackAnalyzer...")
    analyzer = FeedbackAnalyzer()
    
    test_inputs = [
        "This app is working super fine, everything is properly connected and working smoothly!",
        "How do I create a new access token?",
        "I found a super bug, whenever I click the submit button the app crashes.",
        "Could you add a dark mode feature in the next update?"
    ]
    
    print("\n--- Starting Tests ---\n")
    for text in test_inputs:
        print(f"Input: \"{text}\"")
        # analyze() returns a JSON string, so we print it out
        result = analyzer.analyze(text)
        print(f"Output: {result}\n")

if __name__ == "__main__":
    test_model()
