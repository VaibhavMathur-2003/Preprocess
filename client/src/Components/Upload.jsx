import PropTypes from 'prop-types';

const Upload = ({ handleFileChange, handleUpload, handleDownload }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Upload CSV File</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <div className="flex justify-between">
          <button 
            type="submit" 
            className="w-full mr-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Upload
          </button>
          <button 
            type="button" 
            onClick={handleDownload} 
            className="w-full ml-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Download
          </button>
        </div>
      </form>
    </div>
  </div>
);

Upload.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired
};

export default Upload;
