import PropTypes from "prop-types";

const Conversion = ({ headers, conversionOptions, handleConversionOptionChange, handlePrevious, handleNext, handleDownload }) => (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900">
    <div className="flex flex-col justify-center p-8 md:p-10 lg:p-14 bg-gray-800 shadow-lg">
      <div className="w-full max-w-md text-white p-8 rounded-lg shadow-md mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-center">Data Conversion</h3>
        <form className="space-y-4">
          {headers.map((header, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label className="font-medium text-gray-300">{header}</label>
              <select 
                value={conversionOptions[header] || "none"} 
                onChange={handleConversionOptionChange(header)} 
                className="p-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-600 text-white"
              >
                <option value="none">None</option>
                <option value="string">String</option>
                <option value="integer">Integer</option>
                <option value="float">Float</option>
                <option value="datetime">Datetime</option>
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
    <div className="md:flex flex-auto items-center justify-center  text-white bg-no-repeat bg-cover relative bg-blue-500">
    <div
        className="relative sm:w-1/2 xl:w-2/5 h-full md:flex flex-auto items-center justify-center  text-black bg-no-repeat bg-cover"
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
              What is Data Conversion?
            </h2>
            <img
              src="https://img.freepik.com/free-photo/sketch-drawing-cat_1268-30448.jpg?size=626&ext=jpg&ga=GA1.1.777624710.1700978565&semt=sph"
              alt="Descriptive Alt Text"
              className="mx-auto mb-4 rounded-lg shadow-lg w-full max-w-sm"
            />
            <p
              className="text-base md:text-base lg:text-base font-medium leading-relaxed"
              style={{ color: "#000000", fontFamily:"PT Mono" }}
            >
              Data preprocessing in data science refers to the steps taken to
              clean and prepare raw data for analysis. This process involves
              several key steps:<br/> Cleaning: Removing or correcting inaccurate,
              incomplete, or irrelevant data. <br/> Transformation: Converting data
              into a suitable format or structure for analysis, such as
              normalizing values. <br/> Reduction: Simplifying data by reducing its
              volume while maintaining its integrity. <br/>  Integration: Combining data
              from different sources to provide a unified view. 
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Conversion.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  conversionOptions: PropTypes.object.isRequired,
  handleConversionOptionChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,   
  handleDownload: PropTypes.func.isRequired
};

export default Conversion;
