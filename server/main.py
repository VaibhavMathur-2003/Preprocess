from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from io import StringIO
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/api/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    try:
        content = file.read().decode('utf-8')
        delimiter = ';' if ';' in content.split('\n')[0] else ','
        df = pd.read_csv(StringIO(content), delimiter=delimiter)
        headers = list(df.columns)
        df.to_csv('uploaded_file.csv', index=False)  # Save the uploaded file for preprocessing
        return jsonify({"headers": headers}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def convert_column(df, column, dtype):
    if dtype == 'integer':
        df[column] = pd.to_numeric(df[column], errors='coerce').fillna(0).astype(int)
    elif dtype == 'float':
        df[column] = pd.to_numeric(df[column], errors='coerce').astype(float)
    elif dtype == 'datetime':
        df[column] = pd.to_datetime(df[column], errors='coerce')
    elif dtype == 'string':
        df[column] = df[column].astype(str)
    return df

def encode_column(df, column, encoding_type):
    if encoding_type == 'label':
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column].astype(str))
    elif encoding_type == 'onehot':
        ohe = OneHotEncoder(sparse_output=False)
        transformed_data = ohe.fit_transform(df[[column]])
        ohe_df = pd.DataFrame(transformed_data, columns=[f"{column}_{cat}" for cat in ohe.categories_[0]])
        df = pd.concat([df, ohe_df], axis=1).drop(columns=[column])
    return df

@app.route('/api/preprocess', methods=['POST'])
def preprocess_data():
    try:
        data = request.json
        options = data['options']
        remove_duplicates = data.get('removeDuplicates', False)

        df = pd.read_csv('uploaded_file.csv')  # Load the uploaded file

        for option in options:
            header = option['header']
            method = option['method']
            convert_to = option['convertTo']
            encode_as = option['encodeAs']

            if method == 'remove':
                df = df.drop(columns=[header])
            else:
                strategy = method
                imputer = SimpleImputer(strategy=strategy)
                df[[header]] = imputer.fit_transform(df[[header]])

            if convert_to != 'none':
                df = convert_column(df, header, convert_to)

            if encode_as != 'none':
                df = encode_column(df, header, encode_as)

        if remove_duplicates:
            df = df.drop_duplicates()

        df.to_csv('preprocessed_file.csv', index=False)  # Save the preprocessed file

        first_five_rows = df.head().to_dict(orient='records')
        stats = df.describe().to_dict()

        return jsonify({"message": "Preprocessing successful", "first_five_rows": first_five_rows, "stats": stats}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
