import PropTypes from 'prop-types';

const Upload = ({ handleFileChange, handleUpload, handleDownload }) => (
  <div className="min-h-screen grid bg-gray-900">
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
      <div className="relative sm:w-1/3 xl:w-2/5 bg-blue-500 h-full hidden md:flex flex-auto items-center justify-center overflow-hidden text-white bg-no-repeat bg-cover">
        <div className="absolute bg-black opacity-25 inset-0 z-0"></div>
        <div className="w-full lg:max-w-2xl md:max-w-md z-10 items-center text-center">
          <div className="font-bold leading-tight  mx-auto w-full content-center items-center">
            <img className='h-full w-1/3 mx-auto max-h-screen fixed top-0' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz4wsKlGCVP1-OUNROOJodrZsyRscNtd4Pjw&s" alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full  m-auto h-full xl:w-3/4 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-gray-800 shadow-lg">
        <div className="w-full max-w-md text-white p-8 rounded-lg shadow-xl mx-auto bg-gray-800">
          <h2 className="text-2xl font-semibold mb-6 text-center">Upload CSV File</h2>
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
  handleDownload: PropTypes.func.isRequired
};

export default Upload;
