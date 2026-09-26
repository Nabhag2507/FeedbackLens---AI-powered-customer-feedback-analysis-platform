import os

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "final dataset.csv")

HF_MODEL_REPO = "Nabhag2507/feedbacklens-classifier"

# Model configurations
MODEL_NAME = "distilbert-base-uncased"
MAX_LENGTH = 128
BATCH_SIZE = 16
EPOCHS = 3
LEARNING_RATE = 2e-5

# Classification thresholds
CONFIDENCE_THRESHOLD = 0.45

# Category mapping
ID_TO_LABEL = {
    0: "Praise",
    1: "Question",
    2: "Suggestion",
    3: "Complaint",
    4: "Bug Report"
}

LABEL_TO_ID = {v: k for k, v in ID_TO_LABEL.items()}
