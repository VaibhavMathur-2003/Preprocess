import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState('');
  const [preprocessingOptions, setPreprocessingOptions] = useState({});
  const [conversionOptions, setConversionOptions] = useState({});
  const [encodingOptions, setEncodingOptions] = useState({});
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [firstFiveRows, setFirstFiveRows] = useState([]);
  const [stats, setStats] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setHeaders([]);

    if (!file) {
      setError('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setHeaders(response.data.headers);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error uploading file');
    }
  };

  const handlePreprocessingOptionChange = (header) => (e) => {
    setPreprocessingOptions({
      ...preprocessingOptions,
      [header]: e.target.value,
    });
  };

  const handleConversionOptionChange = (header) => (e) => {
    setConversionOptions({
      ...conversionOptions,
      [header]: e.target.value,
    });
  };

  const handleEncodingOptionChange = (header) => (e) => {
    setEncodingOptions({
      ...encodingOptions,
      [header]: e.target.value,
    });
  };

  const handleRemoveDuplicatesChange = (e) => {
    setRemoveDuplicates(e.target.checked);
  };

  const handlePreprocess = async (e) => {
    e.preventDefault();

    const options = headers.map(header => ({
      header,
      method: preprocessingOptions[header] || 'mean',
      convertTo: conversionOptions[header] || 'string',
      encodeAs: encodingOptions[header] || 'none',
    }));

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/preprocess', { options, removeDuplicates });
      setError('Preprocessing successful');
      setFirstFiveRows(response.data.first_five_rows || []);
      setStats(response.data.stats || {});
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error preprocessing data');
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {headers.length > 0 && (
        <form onSubmit={handlePreprocess}>
          <h3>Select Preprocessing Methods and Conversion Types for Headers</h3>
          {headers.map((header, index) => (
            <div key={index}>
              <label>{header}</label>
              <select value={preprocessingOptions[header] || 'mean'} onChange={handlePreprocessingOptionChange(header)}>
                <option value="mean">Mean</option>
                <option value="median">Median</option>
                <option value="most_frequent">most_frequent</option>
                <option value="remove">Remove</option>
              </select>
              <select value={conversionOptions[header] || 'string'} onChange={handleConversionOptionChange(header)}>
                <option value="string">String</option>
                <option value="integer">Integer</option>
                <option value="float">Float</option>
                <option value="datetime">Datetime</option>
              </select>
              <select value={encodingOptions[header] || 'none'} onChange={handleEncodingOptionChange(header)}>
                <option value="none">None</option>
                <option value="label">Label Encoding</option>
                <option value="onehot">One-Hot Encoding</option>
              </select>
            </div>
          ))}
          <div>
            <label>
              <input type="checkbox" checked={removeDuplicates} onChange={handleRemoveDuplicatesChange} />
              Remove duplicate entries
            </label>
          </div>
          <button type="submit">Preprocess</button>
        </form>
      )}
      {firstFiveRows.length > 0 && (
        <div>
          <h3>First Five Rows of Preprocessed Data</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(firstFiveRows[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {firstFiveRows.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {Object.keys(stats).length > 0 && (
        <div>
          <h3>Statistical Data</h3>
          <table>
            <thead>
              <tr>
                <th>Statistic</th>
                {Object.keys(stats).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(stats[Object.keys(stats)[0]] || {}).map((statKey) => (
                <tr key={statKey}>
                  <td>{statKey}</td>
                  {Object.keys(stats).map((key) => (
                    <td key={key}>{stats[key][statKey]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
