from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import openai
import json
import certifi

with open("secrets.json", 'r') as f:
    secrets = json.load(f)

openai.api_key = secrets["openai_key"] # Replace this with your openai key
uri = 'mongodb+srv://regular_user:regular_user@nasahack.ghumh.mongodb.net/?retryWrites=true&w=majority&appName=NASAHack'
client = MongoClient(uri, tlsCAFile=certifi.where())
db = client["nasa"]
collection = db["article_collection"]

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/summarize', methods=['POST'])
def summarise_contents():

    data = request.get_json()

    if not data or 'results' not in data:
        return jsonify({"error": "The 'results' field is required."}), 400
    
    results_list = [{
        "title": p["title"],
        "description": p["description"],
        "doc_type": p["doc_type"]
    }for p in data['results']]

    messages = [
        {"role": "system", "content": """You are a summarization assistant for GLOBE articles. Your job is to give a total
         summary of all the article metadata you are given. The articles themselves are 
         educational resources and activities focused on environmental science. They're more for teachers than students.
         You are given article titles, descriptions, and doc_type in JSON format.
         Read the article metadata but do not specifically reference any of the articles themselves.
         Also don't mention that the articles are educational resources of any kind. The user knows this already.
         Instead, give a vast overview in the format of a general summary for the user based on what you see from the metadata about the articles.
         You are an assistant that is supposed to generally summarize what the user can find with these articles.
         You are not to engage in any kind of conversation with the user. You are not to mention or even acknowledge 
         when an article is lacking in any of these attributes. You are to look nowhere else except for the
         data given to you. DO NOT USE MARKDOWN. DO NOT USE NEWLINES OR BULLET POINTS OR ANYTHING ELSE.
         DO NOT MENTION ANY SPECIFIC ARTICLES. DO NOT MENTION THE WORD "METADATA"."""},
         {"role": "user", "content": json.dumps(results_list)}
    ]

    response = openai.chat.completions.create(model="gpt-4o-mini-2024-07-18", messages=messages, max_tokens=100, temperature=0.3)

    smry = response.choices[0].message.content

    return jsonify({"summary": smry}), 200

# Basic GET endpoint to check if the server is working
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"message": "Server is up and running!"}), 200

# Define a route that accepts POST requests
@app.route('/ask', methods=['POST'])
def handle_json():
    # Get the JSON data from the request
    data = request.get_json()

    question = data["question"]
    results = int(data["results"])


    try:
        response = openai.embeddings.create(model="text-embedding-3-small", input=question)
        vector = response.data[0].embedding

        search_results = collection.aggregate(
            [ 
                {
                "$vectorSearch": {
                    "index": "vector_index",
                    "path": "vector",
                    "queryVector": vector,
                    "numCandidates": results * 10,
                    "limit": results
                }
                },
                {
                "$project": {
                    "title": 1,
                    "description": 1,
                    "doc_type": 1,
                    "url": 1,
                    "_id": 0  # Exclude the _id field from the results if not needed
                }
                }
            ]
        )



        results_list = list(search_results)
        return jsonify({"results": results_list}), 200
 

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# This block should be at the end of the script
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=True)
