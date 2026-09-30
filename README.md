# 🔍 FeedbackLens
> **AI-Powered Customer Feedback Analysis Engine**

An intelligent data pipeline and API that automatically ingests, categorizes, and analyzes customer feedback using custom-trained Natural Language Processing (NLP) models.

---

## 🎯 Project Motivation & The Problem

**The Problem:** Companies receive thousands of feedback messages across various platforms (app stores, social media, forums). Manually sorting through these to find bugs, feature requests, or user sentiment is impossible at scale.

**The Solution:** FeedbackLens is a technical proof-of-concept that automates this process. It classifies raw user feedback into actionable categories (Bug Reports, Suggestions, Praise, etc.) and analyzes the underlying sentiment, demonstrating how AI can help product teams focus on what matters most.

### 🚧 Key Challenge & Engineering Solution
**Data Scarcity for Domain-Specific NLP:** The main challenge in building the AI model was finding domain-specific data appropriate for the problem statement. Public datasets were either too generic or lacked the nuances of real-world software feedback. 

**Solution:** Overcame this challenge by engineering custom Python web scrapers and utilizing APIs to aggregate, filter, and curate a high-quality, relevant dataset directly from scattered real-world sources like social media and app stores.

---

## 🛠️ Tech Stack

- **Machine Learning / NLP:** PyTorch, Hugging Face Transformers (`distilbert-base-uncased`), Scikit-learn, VADER Sentiment Analysis
- **Backend API:** Python, FastAPI, Uvicorn
- **Data Engineering & Scraping:** Python web scraping, Pandas, Numpy

---

## 🏗️ System Architecture

This project is built as a decoupled backend engine meant for local execution and demonstration:

- **AI Model Hosting**: The fine-tuned model is hosted on [Hugging Face](https://huggingface.co/) for seamless download and version control.
- **Inference API**: Built with **FastAPI** (Python). It dynamically loads the AI model into memory and processes incoming text in milliseconds.
- **Local Database (Optional)**: Designed to integrate with MongoDB for storing the raw feedback alongside the AI's analytical output.

---

## ✨ Core Features

- **Custom NLP Classification**: Fine-tuned `distilbert-base-uncased` model trained on custom-scraped software datasets to accurately identify technical bugs, feature requests, and general questions.
- **Sentiment Analysis**: Gauges user frustration or satisfaction using VADER.
- **Confidence Thresholding**: Built-in safety nets that classify ambiguous feedback as "Other" if the AI's confidence score drops below a customizable threshold (e.g., 60%).
- **Self-Documenting API**: Utilizes FastAPI's automated Swagger UI for instant API testing.

---

## 🚀 Getting Started (Local Setup)

This project is designed to be run and tested locally. Follow these steps to run the inference API on your machine:

### Prerequisites
- Python 3.9+

### 1. Installation
Clone the repository and install the backend dependencies:
```bash
git clone https://github.com/Nabhag2507/FeedbackLens---AI-powered-customer-feedback-analysis-platform.git
cd FeedbackLens---AI-powered-customer-feedback-analysis-platform
pip install -r requirements.txt
```

### 2. Run the Backend API
Start the FastAPI server using Uvicorn. The server will automatically download the necessary model weights on the first run.
```bash
uvicorn src.api:app --reload
```

### 3. Interactive API Documentation
Once the server is running, navigate to the automated docs to test the machine learning endpoints directly from your browser:
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

---

## 🛣️ Project Milestones
- [x] Data Gathering via Custom Web Scraping
- [x] Data Cleaning & Regex Scripting
- [x] Model Fine-tuning on Kaggle GPUs
- [x] Cloud Model Hosting via Hugging Face
- [x] Local Inference Pipeline
- [x] FastAPI Backend Integration
