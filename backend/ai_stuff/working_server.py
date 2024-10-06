from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import openai
import json
import certifi

with open("secrets.json", 'r') as f:
    secrets = json.load(f)

openai.api_key = secrets["openai_key"]
uri = secrets["mongo_uri"]
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
        {"role": "system", "content": """You are a summarization tool for GLOBE articles. Your job is to give a total
         summary of all the article metadata you are given. You are given article titles, descriptions, and doc_type in JSON format.
         Read the articles but do not reference the articles themselves. 
         Instead, give a vast overview in the format of a general summary for the user based on what you see from the metadata about the articles.
         You are not to engage in any kind of conversation with the user. You are not to mention or even acknowledge 
         when an article is lacking in any of these attributes. You are to look nowhere else except for the
         data given to you."""},
         {"role": "user", "content": json.dumps(results_list)}
    ]

    response = openai.chat.completions.create(model="gpt-3.5-turbo-0125", messages=messages)

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
