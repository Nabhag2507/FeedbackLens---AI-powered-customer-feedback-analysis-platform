import os
import torch
import numpy as np
from transformers import (
    AutoModelForSequenceClassification, 
    TrainingArguments, 
    Trainer
)
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

try:
    import config
    import data_prep
except ImportError:
    pass 

def compute_metrics(eval_pred):
    """Computes accuracy, precision, recall, and f1 score during training."""
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    
    precision, recall, f1, _ = precision_recall_fscore_support(labels, predictions, average='weighted')
    acc = accuracy_score(labels, predictions)
    
    return {
        'accuracy': acc,
        'f1': f1,
        'precision': precision,
        'recall': recall
    }

def main():
    print(f"Loading data from {config.DATA_PATH}...")
    
    # 1. Load and Prepare Data
    raw_datasets = data_prep.load_and_prepare_data(config.DATA_PATH, config.LABEL_TO_ID)
    
    # 2. Tokenize Data
    tokenized_datasets, tokenizer = data_prep.tokenize_data(
        raw_datasets, 
        config.MODEL_NAME, 
        config.MAX_LENGTH
    )
    
    # 3. Load Pretrained Model
    print(f"Loading model {config.MODEL_NAME}...")
    num_labels = len(config.ID_TO_LABEL)
    model = AutoModelForSequenceClassification.from_pretrained(
        config.MODEL_NAME,
        num_labels=num_labels,
        id2label=config.ID_TO_LABEL,
        label2id=config.LABEL_TO_ID
    )
    
    # 4. Define Training Arguments
    training_args = TrainingArguments(
        output_dir="./results",          # output directory
        num_train_epochs=config.EPOCHS,              # total number of training epochs
        per_device_train_batch_size=config.BATCH_SIZE,  # batch size per device during training
        per_device_eval_batch_size=config.BATCH_SIZE,   # batch size for evaluation
        warmup_steps=500,                # number of warmup steps for learning rate scheduler
        weight_decay=0.01,               # strength of weight decay
        logging_dir='./logs',            # directory for storing logs
        logging_steps=10,
        eval_strategy="epoch",     # evaluate each `epoch`
        save_strategy="epoch",
        learning_rate=config.LEARNING_RATE,
        load_best_model_at_end=True,     # load the best model when finished training
    )
    
    # 5. Initialize Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_datasets['train'],
        eval_dataset=tokenized_datasets['validation'],
        compute_metrics=compute_metrics,
    )
    
    # 6. Train!
    print("Starting training...")
    trainer.train()
    
    # 7. Save the final model and tokenizer
    print(f"Training complete. Saving best model to {config.MODEL_SAVE_DIR}...")
    os.makedirs(config.MODEL_SAVE_DIR, exist_ok=True)
    trainer.save_model(config.MODEL_SAVE_DIR)
    tokenizer.save_pretrained(config.MODEL_SAVE_DIR)
    
    print("All done! Download the files in", config.MODEL_SAVE_DIR)

if __name__ == "__main__":
    main()
