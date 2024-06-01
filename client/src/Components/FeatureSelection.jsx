// src/Components/FeatureSelection.js
import  { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";


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
    <div>
      <h2>Feature Selection</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="targetColumn">Target Column:</label>
          <select
            id="targetColumn"
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            required
          >
            {headers.map((header, index) => (
              <option key={index} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="method">Feature Selection Method:</label>
          <select id="method" value={method} onChange={handleMethodChange}>
            <option value="select_k_best">SelectKBest</option>
            <option value="extra_trees">ExtraTreesClassifier</option>
          </select>
        </div>
        {method === 'select_k_best' && (
          <div>
            <label htmlFor="k">K (number of features to select):</label>
            <input
              type="number"
              id="k"
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              min="1"
              required
            />
          </div>
        )}
        {method === 'extra_trees' && (
          <div>
            <label htmlFor="nEstimators">Number of Estimators:</label>
            <input
              type="number"
              id="nEstimators"
              value={nEstimators}
              onChange={(e) => setNEstimators(Number(e.target.value))}
              min="1"
              required
            />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {responseHeaders.length > 0 && (
        <div>
          <h3>Selected Features</h3>
          <ul>
            {responseHeaders.map((header, index) => (
              <li key={index}>{header}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>

      <button onClick={handleDownload}>Download</button>
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
