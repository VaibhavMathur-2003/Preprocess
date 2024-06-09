import PropTypes from "prop-types";
import "../index.css"

const Encoding = ({ headers, encodingOptions, handleEncodingOptionChange, handlePrevious, handleNext, handleDownload }) => (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900">
    <div className="flex flex-col justify-center p-8 md:p-10 lg:p-14 bg-gray-800 shadow-lg">
      <div className="w-full max-w-md text-white p-8 rounded-lg shadow-md mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-center">Encoding</h3>
        <form className="space-y-4">
          {headers.map((header, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label className="font-medium text-gray-300">{header}</label>
              <select 
                value={encodingOptions[header] || "none"} 
                onChange={handleEncodingOptionChange(header)} 
                className="p-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white"
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
              className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-300"
            >
              Previous
            </button>
            <button 
              type="button" 
              onClick={handleNext} 
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
            >
              Next
            </button>
            <button 
              type="button" 
              onClick={handleDownload} 
              className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300"
            >
              Download
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="flex flex-auto  items-center justify-center  text-white bg-no-repeat bg-cover bg-blue-500">
    <div
        className="relative sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-center  text-black bg-no-repeat bg-cover"
        style={{
          backgroundColor: "#e6e2dd",
          filter: "brightness(1.75)",
          fontFamily: "Lobster Two, sans-serif",
        }}
      >
        <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
        <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center">
          <div className="font-bold leading-tight mx-auto w-full content-center items-center">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-4 text-center"
              style={{ color: "#000000" }}
            >
              What is Data Encoding?
            </h2>
            <img
              src="https://cdn.pixabay.com/photo/2019/09/30/10/12/notredame-de-paris-4515298_640.jpg"
              alt="Descriptive Alt Text"
              className="mx-auto mb-4 rounded-lg shadow-lg w-full max-w-sm"
            />
            <p
              className="text-base md:text-base lg:text-base font-medium leading-relaxed"
              style={{ color: "#000000", fontFamily:"PT Mono" }}
            >
              Data encoding refers to the transformation of raw data into a numerical representation suitable for analysis by machine learning algorithms. This process involves converting categorical variables into numerical values, and potentially applying techniques like one-hot encoding and Label Encoding.
            </p>
          </div>
        </div>
      </div>
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
