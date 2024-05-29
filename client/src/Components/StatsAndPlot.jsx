import PropTypes from "prop-types";

const StatsAndPlot = ({ headers, correlationHeatmap, plotType, setPlotType, xColumn, setXColumn, yColumn, setYColumn, hue, setHue, plot, handlePlot, handlePrevious, handleDownload }) => (
  <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full overflow-x-auto">
      
      {correlationHeatmap && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Correlation Heatmap</h3>
          <img className="mx-auto" src={`data:image/png;base64,${correlationHeatmap}`} alt="Correlation Heatmap" />
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Create a Plot</h3>
        <form onSubmit={handlePlot} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">Plot Type</label>
            <select 
              value={plotType} 
              onChange={(e) => setPlotType(e.target.value)} 
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="scatter">Scatter</option>
              <option value="line">Line</option>
              <option value="bar">Bar</option>
              <option value="hist">Histogram</option>
              <option value="box">Box</option>
              <option value="violin">Violin</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">X Column</label>
            <select 
              value={xColumn} 
              onChange={(e) => setXColumn(e.target.value)} 
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Y Column (Optional)</label>
            <select 
              value={yColumn} 
              onChange={(e) => setYColumn(e.target.value)} 
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">None</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700">Hue (Optional)</label>
            <select 
              value={hue} 
              onChange={(e) => setHue(e.target.value)} 
              className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">None</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Generate Plot
          </button>
        </form>
      </div>
      {plot && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Generated Plot</h3>
          <img className="mx-auto" src={`data:image/png;base64,${plot}`} alt="Generated Plot" />
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button 
          onClick={handlePrevious} 
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          Previous
        </button>
        <button 
          onClick={handleDownload} 
          className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          Download
        </button>
      </div>
    </div>
  </div>
);

StatsAndPlot.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correlationHeatmap: PropTypes.string,
  plotType: PropTypes.string.isRequired,
  setPlotType: PropTypes.func.isRequired,
  xColumn: PropTypes.string.isRequired,
  setXColumn: PropTypes.func.isRequired,
  yColumn: PropTypes.string.isRequired,
  setYColumn: PropTypes.func.isRequired,
  hue: PropTypes.string.isRequired,
  setHue: PropTypes.func.isRequired,
  plot: PropTypes.string,
  handlePlot: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired
};

export default StatsAndPlot;
