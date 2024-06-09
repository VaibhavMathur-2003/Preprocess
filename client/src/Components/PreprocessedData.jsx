import PropTypes from "prop-types";

const PreProcessedData = ({ firstFiveRows,stats, handlePrevious, handleNext, handleDownload }) => (
  <div className="min-h-screen flex items-center justify-center"style={{
    backgroundImage: "url(https://images.unsplash.com/photo-1603484477859-abe6a73f9366?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3J1bXBsZWQlMjBwYXBlcnxlbnwwfHwwfHx8MA%3D%3D)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    filter:"brightness(1.2)",
    fontFamily: "PT Mono, sans-serif",
  }}>
    <div className=" p-8 rounded-lg shadow-md w-full">
      <h3 className="text-2xl font-semibold mb-6 text-center ">First Five Rows of Preprocessed Data</h3>
      {firstFiveRows.length > 0 && (
        <table className="w-full border-collapse border border-blue-500 ">
          <thead>
            <tr className="bg-black">
              {Object.keys(firstFiveRows[0]).map((key) => (
                <th key={key} className="p-2 border border-blue-500 text-white">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {firstFiveRows.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="p-2 border border-blue-500">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {Object.keys(stats).length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 ">Statistical Data</h3>
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-black">
                <th className="py-2 px-4 border border-blue-500">Statistic</th>
                {Object.keys(stats[Object.keys(stats)[0]] || {}).map((statKey) => (
                  <th key={statKey} className="py-2 px-4 border border-blue-500 whitespace-nowrap text-white">{statKey}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(stats[Object.keys(stats)[0]] || {}).map((statKey) => (
                <tr key={statKey}>
                  <td className="py-2 px-4 border border-blue-500">{statKey}</td>
                  {Object.keys(stats).map((key) => (
                    <td key={key} className="py-2 px-4 border border-blue-500">{stats[key][statKey]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-between pt-4">
        <button 
          type="button" 
          onClick={handlePrevious} 
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700  font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          Previous
        </button>
        <button 
          type="button" 
          onClick={handleNext} 
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700  font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Next
        </button>
        <button 
          type="button" 
          onClick={handleDownload} 
          className="py-2 px-4 bg-green-600 hover:bg-green-700  font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          Download
        </button>
      </div>
    </div>
  </div>
);

PreProcessedData.propTypes = {
  firstFiveRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,   
  handleDownload: PropTypes.func.isRequired,
  stats: PropTypes.object.isRequired,

};

export default PreProcessedData;
