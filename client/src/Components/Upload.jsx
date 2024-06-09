import PropTypes from "prop-types";

const Upload = ({ handleFileChange, handleUpload, handleDownload }) => (
  <div className="min-h-screen grid bg-gray-900">
    <div className="flex items-center  flex-auto min-w-0">
      <div
        className="relative h-full flex flex-auto items-center justify-center  text-black bg-no-repeat bg-cover"
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
              What is Data Preprocessing?
            </h2>
            <img
              src="https://cdn.pixabay.com/photo/2015/07/12/06/58/panda-841601_640.jpg"
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

      <div className="flex flex-col md:w-1/2 w-full m-auto h-full p-8  bg-gray-800 shadow-lg">
        <div className="w-full max-w-md text-white p-8 rounded-lg shadow-xl mx-auto bg-gray-800">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Upload CSV File
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="w-full mr-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="w-full ml-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300"
              >
                Download
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

Upload.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
};

export default Upload;
