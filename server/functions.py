import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler, MinMaxScaler
import numpy as np
import matplotlib

matplotlib.use('Agg')

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

def generate_correlation_heatmap(df):
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
        return base64.b64encode(buf.read()).decode('utf-8')
    return None
