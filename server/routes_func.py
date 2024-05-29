from flask import request, jsonify
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from io import BytesIO, StringIO
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, MinMaxScaler
import base64
import numpy as np
from flask import send_file


from functions import (
    convert_column, encode_column, remove_outliers_zscore,
    remove_outliers_iqr, normalize_column, standardize_column,
    generate_correlation_heatmap
)

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

def preprocess_data():
    try:
        data = request.json
        options = data['options']
        remove_duplicates = data.get('removeDuplicates', False)

        df = pd.read_csv('uploaded_file.csv')

        for option in options:
            header = option['header']
            method = option.get('method', 'none')
            convert_to = option.get('convertTo', 'none')
            encode_as = option.get('encodeAs', 'none')
            outlier_method = option.get('outlierMethod', 'none')
            scaling = option.get('scaling', 'none')

            if outlier_method == 'z_score':
                df = remove_outliers_zscore(df, header)
            elif outlier_method == 'iqr':
                df = remove_outliers_iqr(df, header)

            if method != 'none':
                strategy = method
                imputer = SimpleImputer(strategy=strategy)
                df[[header]] = imputer.fit_transform(df[[header]])

            if convert_to != 'none':
                df = convert_column(df, header, convert_to)

            if encode_as != 'none':
                df = encode_column(df, header, encode_as)
                
            if scaling != 'none':
                scaler = MinMaxScaler() if scaling == 'normalization' else StandardScaler()
                df[[header]] = scaler.fit_transform(df[[header]])

        if remove_duplicates:
            df = df.drop_duplicates()

        df.to_csv('preprocessed_file.csv', index=False)
        df_json = df.replace({np.nan: None, pd.NaT: None}).to_dict(orient='records')
        stats = df.describe().replace({np.nan: None}).to_dict()
        heatmap_base64 = generate_correlation_heatmap(df)

        response = {
            "message": "Preprocessing successful",
            "first_five_rows": df_json[:5],
            "stats": stats,
            "correlation_heatmap": heatmap_base64
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def plot_data():
    try:
        data = request.json
        plot_type = data['plotType']
        x_column = data['xColumn']
        y_column = data.get('yColumn', None)
        hue = data.get('hue', None)

        df = pd.read_csv('preprocessed_file.csv')

        plt.figure(figsize=(10, 6))

        plot_mapping = {
            'scatter': sns.scatterplot,
            'line': sns.lineplot,
            'bar': sns.barplot,
            'hist': sns.histplot,
            'box': sns.boxplot,
            'violin': sns.violinplot
        }

        plot_func = plot_mapping.get(plot_type)
        if plot_func:
            plot_func(data=df, x=x_column, y=y_column, hue=hue)
            plt.title(f'{plot_type.capitalize()} Plot')

            buf = BytesIO()
            plt.savefig(buf, format='png')
            plt.close()
            buf.seek(0)
            plot_base64 = base64.b64encode(buf.read()).decode('utf-8')

            return jsonify({"plot": plot_base64})
        else:
            return jsonify({"error": "Invalid plot type specified"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def download_preprocessed():
    try:
        file_path = 'preprocessed_file.csv'  # Make sure this path is correct
        return send_file(file_path, as_attachment=True, download_name='preprocessed.csv')
    except Exception as e:
        return str(e), 500
