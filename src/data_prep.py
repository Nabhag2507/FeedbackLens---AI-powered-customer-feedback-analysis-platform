import pandas as pd
from sklearn.model_selection import train_test_split
from datasets import Dataset, DatasetDict
from transformers import AutoTokenizer


def load_and_prepare_data(csv_path: str, label_mapping: dict, test_size: float = 0.2):
    """
    Loads the dataset, maps string categories to integers, and splits into train/validation sets.
    """
    df = pd.read_csv(csv_path)

    # Ensure columns exist and drop any missing values in content or category
    df = df.dropna(subset=["content", "category"])

    # Map the string category to an integer using the mapping provided
    df["label"] = df["category"].map(label_mapping)

    # Drop rows with unmapped categories (just in case)
    df = df.dropna(subset=["label"])
    df["label"] = df["label"].astype(int)

    # Keep only needed columns
    df = df[["content", "label"]]
    df = df.rename(columns={"content": "text"})

    # Split the data
    train_df, val_df = train_test_split(
        df, test_size=test_size, random_state=42, stratify=df["label"]
    )

    # Convert pandas dataframes to HuggingFace Datasets
    train_dataset = Dataset.from_pandas(train_df, preserve_index=False)
    val_dataset = Dataset.from_pandas(val_df, preserve_index=False)

    return DatasetDict({"train": train_dataset, "validation": val_dataset})


def tokenize_data(dataset: DatasetDict, model_name: str, max_length: int = 128) -> DatasetDict:
    """
    Tokenizes the text data for the transformer model.
    """
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    def tokenize_function(examples):
        return tokenizer(
            examples["text"],
            padding="max_length",
            truncation=True,
            max_length=max_length,
        )

    tokenized_datasets = dataset.map(tokenize_function, batched=True)
    return tokenized_datasets, tokenizer


if __name__ == "__main__":
    import config

    # Quick test if run directly
    print("Loading data...")
    raw_datasets = load_and_prepare_data(config.DATA_PATH, config.LABEL_TO_ID)
    print("Data loaded. Sample:", raw_datasets["train"][0])

    print("Tokenizing data...")
    tokenized_datasets, tokenizer = tokenize_data(
        raw_datasets, config.MODEL_NAME, config.MAX_LENGTH
    )
    print("Data tokenized successfully.")
