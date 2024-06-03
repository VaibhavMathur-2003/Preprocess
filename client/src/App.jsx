// src/App.js
import { useState } from 'react';
import axios from 'axios';
import Upload from './Components/Upload';
import Conversion from './Components/Conversion';
import MissingValues from './Components/MissingValues';
import Encoding from './Components/Encoding';
import Outliers from './Components/Outliers';
import Scaling from './Components/Scaling';
import PreProcessedData from './Components/PreProcessedData';
import StatsAndPlot from './Components/StatsAndPlot';
import FeatureSelection from './Components/FeatureSelection';

const App = () => {
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [preprocessingOptions, setPreprocessingOptions] = useState({});
  const [conversionOptions, setConversionOptions] = useState({});
  const [encodingOptions, setEncodingOptions] = useState({});
  const [outlierOptions, setOutlierOptions] = useState({});
  const [scalingOptions, setScalingOptions] = useState({});
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [firstFiveRows, setFirstFiveRows] = useState([]);
  const [stats, setStats] = useState({});
  const [correlationHeatmap, setCorrelationHeatmap] = useState("");
  const [plotType, setPlotType] = useState("scatter");
  const [xColumn, setXColumn] = useState("");
  const [yColumn, setYColumn] = useState("");
  const [hue, setHue] = useState("");
  const [plot, setPlot] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    setHeaders([]);

    if (!file) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setHeaders(response.data.headers);
      setCurrentStep(2);
      preprocessData();
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error uploading file");
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

  const handleOutlierOptionChange = (header) => (e) => {
    setOutlierOptions({
      ...outlierOptions,
      [header]: e.target.value,
    });
  };

  const handleScalingOptionChange = (header) => (e) => {
    setScalingOptions({
      ...scalingOptions,
      [header]: e.target.value,
    });
  };

  const handleRemoveDuplicatesChange = (e) => {
    setRemoveDuplicates(e.target.checked);
  };

  const preprocessData = async () => {
    const options = headers.map((header) => ({
      header,
      method: preprocessingOptions[header] || "none",
      convertTo: conversionOptions[header] || "none",
      encodeAs: encodingOptions[header] || "none",
      outlierMethod: outlierOptions[header] || "none",
      scaling: scalingOptions[header] || "none",
    }));

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/preprocess", { options, removeDuplicates });
      setFirstFiveRows(response.data.first_five_rows || []);
      setStats(response.data.stats || {});
      setCorrelationHeatmap(response.data.correlation_heatmap || "");
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error preprocessing data");
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    preprocessData();
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    preprocessData();
  };

  const handlePlot = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/plot", {
        plotType,
        xColumn,
        yColumn: yColumn || null,
        hue: hue || null,
      });
      setPlot(response.data.plot);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error generating plot");
    }
  };

  const handleDownload = async () => {
    try {
      await preprocessData();
      const response = await axios.get("http://127.0.0.1:5000/api/download_preprocessed", {
        responseType: 'blob', 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'preprocessed.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error downloading file");
    }
  };
  

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Upload handleFileChange={handleFileChange} handleUpload={handleUpload} handleDownload={handleDownload}  />;
      case 2:
        return <Conversion headers={headers} conversionOptions={conversionOptions} handleConversionOptionChange={handleConversionOptionChange} handlePrevious={handlePrevious} handleNext={handleNext} handleDownload={handleDownload}  />;
      case 3:
        return <MissingValues headers={headers} preprocessingOptions={preprocessingOptions} handlePreprocessingOptionChange={handlePreprocessingOptionChange} handlePrevious={handlePrevious} handleNext={handleNext} handleDownload={handleDownload}  />;
      case 4:
        return <Encoding headers={headers} encodingOptions={encodingOptions} handleEncodingOptionChange={handleEncodingOptionChange} handlePrevious={handlePrevious} handleNext={handleNext} handleDownload={handleDownload}  />;
      case 5:
        return <Outliers headers={headers} outlierOptions={outlierOptions} handleOutlierOptionChange={handleOutlierOptionChange} handlePrevious={handlePrevious} handleNext={handleNext} handleDownload={handleDownload}  />;
      case 6:
        return <Scaling headers={headers} scalingOptions={scalingOptions} handleScalingOptionChange={handleScalingOptionChange} removeDuplicates={removeDuplicates} handleRemoveDuplicatesChange={handleRemoveDuplicatesChange} handlePrevious={handlePrevious} handleNext={handleNext} handleDownload={handleDownload}  />;
      case 7:
        return <PreProcessedData firstFiveRows={firstFiveRows} stats={stats} handlePrevious={handlePrevious} handleNext={handleNext} handleDownload={handleDownload}  />;
      case 8:
        return <StatsAndPlot headers={headers}  correlationHeatmap={correlationHeatmap} plotType={plotType} setPlotType={setPlotType} xColumn={xColumn} setXColumn={setXColumn} yColumn={yColumn} setYColumn={setYColumn} hue={hue} setHue={setHue} plot={plot} handlePlot={handlePlot} handlePrevious={handlePrevious} handleNext={handleNext} handleDownload={handleDownload}  />;
      case 9:
        return <FeatureSelection headers={headers} handlePrevious={handlePrevious} handleNext={handleNext} handleDownload={handleDownload} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {renderStep()}
    </div>
  );
};

export default App;
