// src/Components/FeatureSelection.js
import { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import "../index.css"

const FeatureSelection = ({ headers, handlePrevious, handleNext, handleDownload }) => {
  const [method, setMethod] = useState('select_k_best');
  const [k, setK] = useState(10);
  const [nEstimators, setNEstimators] = useState(100);
  const [targetColumn, setTargetColumn] = useState(headers.length > 0 ? headers[0] : '');
  const [error, setError] = useState("");
  const [responseHeaders, setResponseHeaders] = useState([]);
  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponseHeaders([]);

    const requestData = {
      targetColumn,
      method,
      k: method === 'select_k_best' ? k : undefined,
      nEstimators: method === 'extra_trees' ? nEstimators : undefined,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/select_features', requestData);
      setResponseHeaders(response.data.headers);
    } catch (error) {
      setError(error.response ? error.response.data.error : "An error occurred");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Feature Selection</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="targetColumn" className="block text-gray-700 font-medium mb-2">Target Column:</label>
          <select
            id="targetColumn"
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            {headers.map((header, index) => (
              <option key={index} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="method" className="block text-gray-700 font-medium mb-2">Feature Selection Method:</label>
          <select
            id="method"
            value={method}
            onChange={handleMethodChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="select_k_best">SelectKBest</option>
            <option value="extra_trees">ExtraTreesClassifier</option>
          </select>
        </div>
        {method === 'select_k_best' && (
          <div className="mb-4">
            <label htmlFor="k" className="block text-gray-700 font-medium mb-2">K (number of features to select):</label>
            <input
              type="number"
              id="k"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}
        {method === 'extra_trees' && (
          <div className="mb-4">
            <label htmlFor="nEstimators" className="block text-gray-700 font-medium mb-2">Number of Estimators:</label>
            <input
              type="number"
              id="nEstimators"
              value={nEstimators}
              onChange={(e) => setNEstimators(Number(e.target.value))}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {responseHeaders.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Selected Features</h3>
          <ul className="list-disc pl-5">
            {responseHeaders.map((header, index) => (
              <li key={index} className="text-gray-700">{header}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrevious}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Previous
        </button>
        {/* <button
          onClick={handleNext}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Next
        </button> */}
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
      >
        Download
      </button>
    </div>
  );
};

FeatureSelection.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired
};

export default FeatureSelection;
