import { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import "../index.css";

const FeatureSelection = ({ headers, handlePrevious, handleDownload }) => {
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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900">
      <div className="flex flex-col justify-center p-8 md:p-10 lg:p-14 bg-gray-800 shadow-lg">
        <div className="w-full max-w-md text-white p-8 rounded-lg shadow-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Feature Selection</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="targetColumn" className="block text-gray-300 font-medium mb-2">Target Column:</label>
              <select
                id="targetColumn"
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
                className="w-full p-2 border border-blue-500 rounded-md bg-gray-600 text-white"
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
              <label htmlFor="method" className="block text-gray-300 font-medium mb-2">Feature Selection Method:</label>
              <select
                id="method"
                value={method}
                onChange={handleMethodChange}
                className="w-full p-2 border border-blue-500 rounded-md bg-gray-600 text-white"
              >
                <option value="select_k_best">SelectKBest</option>
                <option value="extra_trees">ExtraTreesClassifier</option>
              </select>
            </div>
            {method === 'select_k_best' && (
              <div className="mb-4">
                <label htmlFor="k" className="block text-gray-300 font-medium mb-2">K (number of features to select):</label>
                <input
                  type="number"
                  id="k"
                  value={k}
                  onChange={(e) => setK(Number(e.target.value))}
                  min="1"
                  className="w-full p-2 border border-blue-500 rounded-md bg-gray-600 text-white"
                  required
                />
              </div>
            )}
            {method === 'extra_trees' && (
              <div className="mb-4">
                <label htmlFor="nEstimators" className="block text-gray-300 font-medium mb-2">Number of Estimators:</label>
                <input
                  type="number"
                  id="nEstimators"
                  value={nEstimators}
                  onChange={(e) => setNEstimators(Number(e.target.value))}
                  min="1"
                  className="w-full p-2 border border-blue-500 rounded-md bg-gray-600 text-white"
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
                  <li key={index} className="text-gray-300">{header}</li>
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
          </div>
          <button
            onClick={handleDownload}
            className="mt-4 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Download
          </button>
        </div>
      </div>
      <div className="hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden text-white bg-no-repeat bg-cover relative bg-blue-500">
        <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
        <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center text-center">
          <div className="font-bold leading-tight mb-6 mx-auto w-full content-center items-center">
            <img className="h-1/2 w-5/12 max-h-screen fixed top-[15%] right-[3%]" src="https://media.geeksforgeeks.org/wp-content/uploads/20240123141843/data-types-in-programming.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureSelection.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired
};

export default FeatureSelection;