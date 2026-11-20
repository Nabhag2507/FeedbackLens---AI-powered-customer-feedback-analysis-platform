
# FeedbackLens
### AI-Powered Customer Feedback Automation & Analysis

FeedbackLens automates customer feedback processing using NLP. It classifies incoming reviews into predefined categories, performs sentiment analysis, and generates confidence scores to reduce manual feedback analysis.

**Automation Workflow:**
- Automated feedback classification using fine-tuned DistilBERT.
- Automatic sentiment detection (Positive, Negative, Neutral).
- Confidence-based prediction with configurable thresholds.
- REST API for automated feedback processing and inference.

## Tech Stack

| Category | Technologies |
|:---|:---|
| Language | Python |
| Deep Learning | PyTorch |
| NLP & Transformers | Hugging Face Transformers, DistilBERT |
| Sentiment Analysis | VADER (NLTK) |
| Data Processing | Pandas, NumPy, Scikit-learn |
| Data Collection | BeautifulSoup, Web Scraping, APIs |
| Backend | FastAPI, Uvicorn |
| Model Hosting | Hugging Face Hub |
| Database | MongoDB |

## Features

- Multi-class classification: Complaint, Praise, Bug Report, Feature Request, Suggestion, Question, Other.
- Sentiment analysis using VADER.
- Prediction confidence scores and threshold-based handling.
- FastAPI endpoints for model inference.
- Interactive API documentation using Swagger UI.

## Setup

```bash
git clone https://github.com/Nabhag2507/FeedbackLens---AI-powered-customer-feedback-analysis-platform.git

cd FeedbackLens---AI-powered-customer-feedback-analysis-platform

pip install -r requirements.txt

uvicorn src.api:app --reload
```

**API Documentation:** http://127.0.0.1:8000/docs
