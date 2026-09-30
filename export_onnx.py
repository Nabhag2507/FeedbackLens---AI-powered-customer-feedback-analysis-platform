import os
import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer

print("Loading model and tokenizer...")
model = AutoModelForSequenceClassification.from_pretrained("models/category_model")
tokenizer = AutoTokenizer.from_pretrained("models/category_model")

os.makedirs("models/category_model_onnx", exist_ok=True)
tokenizer.save_pretrained("models/category_model_onnx")

print("Exporting model to ONNX...")
inputs = tokenizer("This is a test", return_tensors="pt")

torch.onnx.export(
    model, 
    (inputs["input_ids"], inputs["attention_mask"]), 
    "models/category_model_onnx/model.onnx",
    input_names=["input_ids", "attention_mask"],
    output_names=["logits"],
    dynamic_axes={
        "input_ids": {0: "batch_size", 1: "sequence_length"},
        "attention_mask": {0: "batch_size", 1: "sequence_length"},
        "logits": {0: "batch_size"}
    },
    opset_version=14
)

print("ONNX export complete!")
