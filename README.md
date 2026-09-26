# FeedbackLens 🔍
*AI-Powered Customer Feedback Analysis Platform*

FeedbackLens is a full-stack SaaS platform that automatically categorizes and analyzes customer feedback using a custom-trained Natural Language Processing (NLP) model. It intelligently classifies raw user feedback into actionable categories (Bug Reports, Suggestions, Praise, etc.) and determines the underlying sentiment.

---

## 🏗️ System Architecture

FeedbackLens is built using a modern, decoupled microservices architecture:

- **AI Model Hosting**: Hosted on [Hugging Face](https://huggingface.co/) for seamless cloud access and version control.
- **Backend API**: Built with **FastAPI** (Python). It dynamically loads the AI model into memory, processes incoming text in milliseconds, and interfaces with the database.
- **Database**: **MongoDB Atlas** stores the raw feedback natively alongside the AI's analytical output.
- **Frontend**: *(Coming Soon)* React/Next.js dashboard deployed on Vercel.

---

## ✨ Features

- **Custom NLP Classification**: Fine-tuned `distilbert-base-uncased` model trained on software-specific datasets to accurately identify technical bugs, feature requests, and general questions.
- **Sentiment Analysis**: Integrated VADER sentiment analysis to gauge user frustration or satisfaction.
- **Confidence Thresholding**: Built-in safety nets that classify ambiguous feedback as "Other" if the AI's confidence score drops below a customizable threshold (e.g., 60%).
- **Self-Documenting API**: Utilizes FastAPI's automated Swagger UI for instant API testing and frontend integration.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Python 3.9+
- A MongoDB Atlas account and connection string.

### 1. Installation
Clone the repository and install the backend dependencies:
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your MongoDB Atlas connection string:
```env
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/FeedbackLensDB?retryWrites=true&w=majority"
```

### 3. Run the Backend API
Start the FastAPI server using Uvicorn:
```bash
uvicorn src.api:app --reload
```

### 4. Interactive API Documentation
Once the server is running, navigate to the automated docs to test the endpoints directly from your browser:
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

---

## 🛣️ Roadmap
- [x] Data Preparation & Regex Scripting
- [x] Model Fine-tuning on Kaggle GPUs
- [x] Cloud Model Hosting via Hugging Face
- [x] Local Inference Pipeline
- [x] FastAPI Backend & MongoDB Integration
- [ ] Frontend React Dashboard Integration
- [ ] Production Deployment (Render & Vercel)
