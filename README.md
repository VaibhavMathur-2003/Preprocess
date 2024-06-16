# CSV Preprocessing Web Application

This web application allows users to upload a CSV file and perform a variety of preprocessing tasks. The application is built using Flask for the backend and React with Vite for the frontend, styled with Tailwind CSS.

## Features

### 1. Upload CSV File
- Users can upload a CSV file to the application.

### 2. Data Type Conversion
- Users can change the data types of the columns in the uploaded CSV file.

### 3. Handling Missing Values
- Users can handle missing values using various methods:
  - Mean
  - Median
  - Most Frequent

### 4. Data Scaling
- Users can scale their data using normalization or standardization techniques:
  - Normalization
  - Standardization

### 5. Graph Plotting
- Users can generate various graphs to visualize the data:
  - Line Graph
  - Bar Chart
  - Histogram
  - Scatter Plot
  - Box Plot

### 6. Correlation Heatmap
- Users can create a correlation heatmap to understand the relationships between different features in the dataset.

### 7. Outliers Handling
- Users can handle outliers using:
  - Z-score
  - Interquartile Range (IQR)

### 8. Feature Selection
- Users can perform feature selection to identify and select the most important features in the dataset.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.

### Backend
- **Flask**: A lightweight WSGI web application framework in Python.

## Getting Started

### Prerequisites
- Python 3.x
- Node.js

### Installation

#### Backend
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
