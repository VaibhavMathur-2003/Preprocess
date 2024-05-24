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
  const [correlationHeatmap, setCorrelationHeatmap] = useState('');
  const [plotType, setPlotType] = useState('scatter');
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [hue, setHue] = useState('');
  const [plot, setPlot] = useState('');

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
      method: preprocessingOptions[header] || 'none',
      convertTo: conversionOptions[header] || 'none',
      encodeAs: encodingOptions[header] || 'none',
    }));

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/preprocess', { options, removeDuplicates });
      setError('Preprocessing successful');
      setFirstFiveRows(response.data.first_five_rows || []);
      setStats(response.data.stats || {});
      setCorrelationHeatmap(response.data.correlation_heatmap || '');
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error preprocessing data');
    }
  };

  const handlePlot = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/plot', {
        plotType,
        xColumn,
        yColumn: yColumn || null,
        hue: hue || null
      });
      setPlot(response.data.plot);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Error generating plot');
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
              <select value={preprocessingOptions[header] || 'none'} onChange={handlePreprocessingOptionChange(header)}>
                <option value="none">None</option>
                <option value="mean">Mean</option>
                <option value="median">Median</option>
                <option value="most_frequent">Most Frequent</option>
                <option value="remove">Remove</option>
              </select>
              <select value={conversionOptions[header] || 'none'} onChange={handleConversionOptionChange(header)}>
                <option value="none">None</option>
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
      {correlationHeatmap && (
        <div>
          <h3>Correlation Heatmap</h3>
          <img src={`data:image/png;base64,${correlationHeatmap}`} alt="Correlation Heatmap" />
        </div>
      )}
      {headers.length > 0 && (
        <form onSubmit={handlePlot}>
          <h3>Create a Plot</h3>
          <div>
            <label>Plot Type</label>
            <select value={plotType} onChange={(e) => setPlotType(e.target.value)}>
              <option value="scatter">Scatter</option>
              <option value="line">Line</option>
              <option value="bar">Bar</option>
              <option value="hist">Histogram</option>
              <option value="box">Box</option>
              <option value="violin">Violin</option>
            </select>
          </div>
          <div>
            <label>X Column</label>
            <select value={xColumn} onChange={(e) => setXColumn(e.target.value)}>
              {headers.map((header, index) => (
                <option key={index} value={header}>{header}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Y Column (Optional)</label>
            <select value={yColumn} onChange={(e) => setYColumn(e.target.value)}>
              <option value="">None</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>{header}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Hue (Optional)</label>
            <select value={hue} onChange={(e) => setHue(e.target.value)}>
              <option value="">None</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>{header}</option>
              ))}
            </select>
          </div>
          <button type="submit">Generate Plot</button>
        </form>
      )}
      {plot && (
        <div>
          <h3>Generated Plot</h3>
          <img src={`data:image/png;base64,${plot}`} alt="Generated Plot" />
        </div>
      )}
    </div>
  );
};

export default App;
