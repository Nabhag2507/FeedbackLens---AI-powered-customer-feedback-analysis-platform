from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
import os
import json
from datetime import datetime
from dotenv import load_dotenv

# Import your existing AI class!
from src.inference import FeedbackAnalyzer

# 1. Load environment variables (like your MongoDB password)
load_dotenv()

# 2. Initialize the FastAPI app
app = FastAPI(title="FeedbackLens API")

# Allow your React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, put your Vercel URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Initialize the AI Model (Downloads from Hugging Face once on startup)
print("Initializing AI Model...")
analyzer = FeedbackAnalyzer()

# 4. Connect to MongoDB Atlas
# It looks for MONGO_URI in a .env file. If it doesn't exist, it uses a dummy string.
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)

# Select the database and collection
db = client["FeedbackLensDB"]
feedbacks_collection = db["feedbacks"]

# 5. Define the data structure we expect from the React Frontend
class FeedbackRequest(BaseModel):
    user_id: str
    text: str

# 6. Create the API Endpoint
@app.post("/api/feedback")
async def analyze_and_save_feedback(request: FeedbackRequest):
    try:
        # A. Run the text through your AI model
        # analyzer.analyze() returns a JSON string, so we use json.loads to turn it back into a Python dictionary
        ai_result_string = analyzer.analyze(request.text)
        ai_analysis_dict = json.loads(ai_result_string)

        # B. Construct the document for MongoDB
        document = {
            "user_id": request.user_id,
            "raw_text": request.text,
            "ai_analysis": ai_analysis_dict,
            "submitted_at": datetime.utcnow().isoformat(),
            "status": "unread"
        }

        # C. Save it to MongoDB
        result = feedbacks_collection.insert_one(document)

        # D. Return success to the frontend
        return {
            "message": "Feedback successfully analyzed and saved!",
            "document_id": str(result.inserted_id),
            "analysis": ai_analysis_dict
        }

    except Exception as e:
        # If anything goes wrong, send a 500 error back to the frontend
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/feedback")
async def get_all_feedback(user_id: str = None):
    try:
        query = {}
        if user_id:
            query["user_id"] = user_id
            
        # Get from MongoDB, sorted by newest first
        cursor = feedbacks_collection.find(query).sort("submitted_at", -1)
        
        results = []
        for doc in cursor:
            # MongoDB's _id is not JSON serializable by default, so we convert it to a string
            doc["_id"] = str(doc["_id"])
            results.append(doc)
            
        return {"feedbacks": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# A simple health check endpoint
@app.get("/")
def health_check():
    return {"status": "Backend is running flawlessly!"}
