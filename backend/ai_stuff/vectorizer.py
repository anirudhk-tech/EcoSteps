from sentence_transformers import SentenceTransformer

# Load the model
model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')

# Sample sentence/paragraph
text = "This is a test paragraph to convert into a vector embedding using the all-mpnet-base-v2 model."

# Generate the embedding
embedding = model.encode(text)

# Print the embedding
print("Embedding vector:")
print(embedding)
print(f"Vector dimension: {len(embedding)}")
