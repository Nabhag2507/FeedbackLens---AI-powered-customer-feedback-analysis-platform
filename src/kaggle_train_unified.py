# ==========================================
# CELL 1: INSTALL DEPENDENCIES (Run this first in Kaggle)
# ==========================================
# !pip install transformers datasets accelerate scikit-learn pandas

# ==========================================
# CELL 2: TRAINING SCRIPT
# ==========================================
import os
import pandas as pd
import numpy as np
import torch
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from datasets import Dataset, DatasetDict
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification, 
    TrainingArguments, 
    Trainer
)

# --- CONFIGURATION ---
# Change this path to wherever your dataset is located in Kaggle
# Usually it looks something like: "/kaggle/input/your-dataset-name/final dataset.csv"
DATA_PATH = "/kaggle/input/feedback-lens-data/final dataset.csv" 
MODEL_SAVE_DIR = "./saved_model"

MODEL_NAME = "distilbert-base-uncased"
MAX_LENGTH = 128
BATCH_SIZE = 16
EPOCHS = 3
LEARNING_RATE = 2e-5

ID_TO_LABEL = {
    0: "Praise",
    1: "Question",
    2: "Suggestion",
    3: "Complaint",
    4: "Bug Report"
}
LABEL_TO_ID = {v: k for k, v in ID_TO_LABEL.items()}

# --- DATA PREP FUNCTIONS ---
def load_and_prepare_data(csv_path, label_mapping, test_size=0.2):
    df = pd.read_csv(csv_path)
    df = df.dropna(subset=['content', 'category'])
    df['label'] = df['category'].map(label_mapping)
    df = df.dropna(subset=['label'])
    df['label'] = df['label'].astype(int)
    df = df[['content', 'label']]
    df = df.rename(columns={'content': 'text'})
    
    train_df, val_df = train_test_split(df, test_size=test_size, random_state=42, stratify=df['label'])
    
    train_dataset = Dataset.from_pandas(train_df, preserve_index=False)
    val_dataset = Dataset.from_pandas(val_df, preserve_index=False)
    
    return DatasetDict({'train': train_dataset, 'validation': val_dataset})

def tokenize_data(dataset, model_name, max_length=128):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    def tokenize_function(examples):
        return tokenizer(examples['text'], padding="max_length", truncation=True, max_length=max_length)
    return dataset.map(tokenize_function, batched=True), tokenizer

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, predictions, average='weighted')
    acc = accuracy_score(labels, predictions)
    return {'accuracy': acc, 'f1': f1, 'precision': precision, 'recall': recall}

# --- MAIN EXECUTION ---
print("Loading data...")
# NOTE: If you get a FileNotFoundError, make sure you uploaded the dataset to Kaggle 
# and updated the DATA_PATH variable above!
raw_datasets = load_and_prepare_data(DATA_PATH, LABEL_TO_ID)

print("Tokenizing data...")
tokenized_datasets, tokenizer = tokenize_data(raw_datasets, MODEL_NAME, MAX_LENGTH)

print("Loading model...")
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=len(ID_TO_LABEL),
    id2label=ID_TO_LABEL,
    label2id=LABEL_TO_ID
)

training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=EPOCHS,
    per_device_train_batch_size=BATCH_SIZE,
    per_device_eval_batch_size=BATCH_SIZE,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    eval_strategy="epoch",
    save_strategy="epoch",
    learning_rate=LEARNING_RATE,
    load_best_model_at_end=True,
    report_to="none" # Prevents Kaggle from trying to log to Weights & Biases
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets['train'],
    eval_dataset=tokenized_datasets['validation'],
    compute_metrics=compute_metrics,
)

print("Starting training...")
trainer.train()

print(f"Training complete. Saving best model to {MODEL_SAVE_DIR}...")
os.makedirs(MODEL_SAVE_DIR, exist_ok=True)
trainer.save_model(MODEL_SAVE_DIR)
tokenizer.save_pretrained(MODEL_SAVE_DIR)
print("Done! You can now zip and download the folder from the Kaggle output menu.")
