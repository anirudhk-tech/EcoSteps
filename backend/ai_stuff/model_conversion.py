from transformers import AutoModel, AutoTokenizer
import torch

# Load the pre-trained model and tokenizer from Hugging Face
model_name = 'sentence-transformers/all-mpnet-base-v2'
model = AutoModel.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Sample sentence/paragraph
text = "This is a test paragraph to convert into a vector embedding using the all-mpnet-base-v2 model."
text2 = "How do I tell you why I want you, darling I couldn't tell you that"

# Tokenize the input text
inputs = tokenizer([text, text2], return_tensors='pt', truncation=True, padding=True)
# Get the embeddings from the model
with torch.no_grad():
    outputs = model(**inputs)
    # Use the outputs from the model (last_hidden_state)
    embeddings = outputs.last_hidden_state.mean(dim=1).squeeze()

# Print the embedding vector
print("Embedding vector:")
print(embeddings)
print(f"Vector dimension: {embeddings[0].shape[0]}")
