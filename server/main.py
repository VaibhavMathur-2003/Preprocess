from flask import Flask
from flask_cors import CORS

from routes_func import upload_csv, preprocess_data, plot_data

app = Flask(__name__)
CORS(app, origins='*')

app.add_url_rule('/api/upload', view_func=upload_csv, methods=['POST'])
app.add_url_rule('/api/preprocess', view_func=preprocess_data, methods=['POST'])
app.add_url_rule('/api/plot', view_func=plot_data, methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True)
