from flask import Flask, request, jsonify
from transformers import pipeline
from bs4 import BeautifulSoup
import requests
from flask_ngrok import run_with_ngrok

app = Flask(__name__)
run_with_ngrok(app) 

model_name = "t5-small"
summarizer = pipeline("summarization", model=model_name)

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
       
        url = request.json['url']

        
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        results = soup.find_all(['h1', 'p'])
        text = [result.text for result in results]
        article = ' '.join(text)

       
        res = summarizer(article, max_length=120, min_length=30, do_sample=False)
        summary = ' '.join([summ['summary_text'] for summ in res])

        return jsonify({'summary': summary})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run()
