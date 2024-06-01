from flask import Flask
from flask_cors import CORS

from routes_func import upload_csv, preprocess_data, plot_data, download_preprocessed, select_features

app = Flask(__name__)
CORS(app, origins='*')

app.add_url_rule('/api/upload', view_func=upload_csv, methods=['POST'])
app.add_url_rule('/api/preprocess', view_func=preprocess_data, methods=['POST'])
app.add_url_rule('/api/plot', view_func=plot_data, methods=['POST'])
app.add_url_rule('/api/select_features', view_func=select_features, methods=['POST'])
app.add_url_rule('/api/download_preprocessed',view_func=download_preprocessed, methods=['GET'])


if __name__ == '__main__':
    app.run(debug=True)
