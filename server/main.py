from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from io import BytesIO, StringIO
import base64
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler, MinMaxScaler

import numpy as np

import matplotlib
matplotlib.use('Agg')

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
        df.to_csv('uploaded_file.csv', index=False)  
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

def remove_outliers_zscore(df, column, threshold=3):
    if df[column].dtype in [np.float64, np.int64]:  
        z_scores = np.abs((df[column] - df[column].mean()) / df[column].std())
        return df[z_scores < threshold]
    return df

def remove_outliers_iqr(df, column):
    if df[column].dtype in [np.float64, np.int64]:  
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        return df[(df[column] >= (Q1 - 1.5 * IQR)) & (df[column] <= (Q3 + 1.5 * IQR))]
    return df

def normalize_column(df, column):
    scaler = MinMaxScaler()
    df[column] = scaler.fit_transform(df[[column]])
    return df

def standardize_column(df, column):
    scaler = StandardScaler()
    df[column] = scaler.fit_transform(df[[column]])
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
            method = option.get('method', 'none')
            convert_to = option.get('convertTo', 'none')
            encode_as = option.get('encodeAs', 'none')
            outlier_method = option.get('outlierMethod', 'none')
            scaling = option.get('scaling', 'none')

            if outlier_method != 'none':
                if outlier_method == 'z_score':
                    df = remove_outliers_zscore(df, header)
                elif outlier_method == 'iqr':
                    df = remove_outliers_iqr(df, header)

            if method != 'none':
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
                
            if scaling != 'none':
                if scaling == 'normalization':
                    scaler = MinMaxScaler()
                elif scaling == 'standardization':
                    scaler = StandardScaler()
                df[[header]] = scaler.fit_transform(df[[header]])

        if remove_duplicates:
            df = df.drop_duplicates()

        df.to_csv('preprocessed_file.csv', index=False) 

        df_json = df.replace({np.nan: None, pd.NaT: None})  
        json_data = df_json.to_dict(orient='records')
        stats = df.describe().replace({np.nan: None}).to_dict()

        numeric_df = df.select_dtypes(include=[np.number])  
        if not numeric_df.empty:
            corr = numeric_df.corr()

            plt.figure(figsize=(10, 8))
            sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm')
            plt.title('Correlation Heatmap')

            buf = BytesIO()
            plt.savefig(buf, format='png')
            plt.close()
            buf.seek(0)
            heatmap_base64 = base64.b64encode(buf.read()).decode('utf-8')
        else:
            heatmap_base64 = None

        response = {
            "message": "Preprocessing successful",
            "first_five_rows": json_data[:5],  
            "stats": stats,
            "correlation_heatmap": heatmap_base64
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/plot', methods=['POST'])
def plot_data():
    try:
        data = request.json
        plot_type = data['plotType']
        x_column = data['xColumn']
        y_column = data.get('yColumn', None)
        hue = data.get('hue', None)

        df = pd.read_csv('preprocessed_file.csv')  # Load the preprocessed file

        plt.figure(figsize=(10, 6))

        if plot_type == 'scatter':
            sns.scatterplot(data=df, x=x_column, y=y_column, hue=hue)
        elif plot_type == 'line':
            sns.lineplot(data=df, x=x_column, y=y_column, hue=hue)
        elif plot_type == 'bar':
            sns.barplot(data=df, x=x_column, y=y_column, hue=hue)
        elif plot_type == 'hist':
            sns.histplot(data=df, x=x_column, hue=hue, kde=True)
        elif plot_type == 'box':
            sns.boxplot(data=df, x=x_column, y=y_column, hue=hue)
        elif plot_type == 'violin':
            sns.violinplot(data=df, x=x_column, y=y_column, hue=hue)

        plt.title(f'{plot_type.capitalize()} Plot')

        buf = BytesIO()
        plt.savefig(buf, format='png')
        plt.close()
        buf.seek(0)
        plot_base64 = base64.b64encode(buf.read()).decode('utf-8')

        return jsonify({"plot": plot_base64})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
