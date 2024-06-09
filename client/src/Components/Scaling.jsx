import PropTypes from "prop-types";

const Scaling = ({ headers, scalingOptions, handleScalingOptionChange, removeDuplicates, handleRemoveDuplicatesChange, handlePrevious, handleNext, handleDownload }) => (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900">
    <div className="flex flex-col justify-center p-8 md:p-10 lg:p-14 bg-gray-800 shadow-lg">
      <div className="w-full max-w-md text-white p-8 rounded-lg shadow-md mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-center">Scaling</h3>
        <form className="space-y-4">
          {headers.map((header, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label className="font-medium text-gray-300">{header}</label>
              <select 
                value={scalingOptions[header] || "none"} 
                onChange={handleScalingOptionChange(header)} 
                className="p-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white"
              >
                <option value="none">None</option>
                <option value="normalization">Normalization</option>
                <option value="standardization">Standardization</option>
              </select>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={removeDuplicates} 
              onChange={handleRemoveDuplicatesChange} 
              className="text-blue-500 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="text-gray-300">Remove duplicate entries</label>
          </div>
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
    <div className="hidden md:flex flex-auto items-center justify-center  text-white bg-no-repeat bg-cover relative bg-blue-500">
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
              What is Scaling?
            </h2>
            <img
              src="https://cdn.pixabay.com/photo/2022/08/21/22/53/butterfly-7402310_640.png"
              alt="Descriptive Alt Text"
              className="mx-auto mb-4 rounded-lg shadow-lg w-full max-w-sm"
            />
            <p
              className="text-base md:text-base lg:text-base font-medium leading-relaxed"
              style={{ color: "#000000", fontFamily:"PT Mono" }}
            >
              Scaling in data science refers to the process of transforming numerical features to a similar scale, typically to ensure that no single feature dominates the analysis or modeling process due to its magnitude. This is crucial for algorithms that are sensitive to the scale of input variables. Common scaling techniques include standardization (subtracting the mean and dividing by the standard deviation) and normalization (scaling values to a range between 0 and 1).
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Scaling.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  scalingOptions: PropTypes.object.isRequired,
  handleScalingOptionChange: PropTypes.func.isRequired,
  removeDuplicates: PropTypes.bool.isRequired,
  handleRemoveDuplicatesChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired
};

export default Scaling;
