import PropTypes from "prop-types";

const Encoding = ({ headers, encodingOptions, handleEncodingOptionChange, handlePrevious, handleNext, handleDownload }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Encoding</h3>
      <form className="space-y-4">
        {headers.map((header, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">{header}</label>
            <select 
              value={encodingOptions[header] || "none"} 
              onChange={handleEncodingOptionChange(header)} 
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="none">None</option>
              <option value="label">Label Encoding</option>
              <option value="onehot">One-Hot Encoding</option>
            </select>
          </div>
        ))}
        <div className="flex justify-between pt-4">
          <button 
            type="button" 
            onClick={handlePrevious} 
            className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            Previous
          </button>
          <button 
            type="button" 
            onClick={handleNext} 
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Next
          </button>
          <button 
            type="button" 
            onClick={handleDownload} 
            className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Download
          </button>
        </div>
      </form>
    </div>
  </div>
);

Encoding.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  encodingOptions: PropTypes.object.isRequired,
  handleEncodingOptionChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,   
  handleDownload: PropTypes.func.isRequired
};

export default Encoding;
