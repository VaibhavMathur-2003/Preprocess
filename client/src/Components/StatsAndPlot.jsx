import PropTypes from "prop-types";

const StatsAndPlot = ({ 
  headers, 
  stats, 
  correlationHeatmap, 
  plotType, 
  setPlotType, 
  xColumn, 
  setXColumn, 
  yColumn, 
  setYColumn, 
  hue, 
  setHue, 
  handlePlot, 
  plot, 
  handlePrevious 
}) => {
  return (
    <div>
      {Object.keys(stats).length > 0 && (
        <div>
          <h3>Statistical Data</h3>
          <table>
            <thead>
              <tr>
                <th>Statistic</th>
                {Object.keys(stats[Object.keys(stats)[0]] || {}).map((statKey) => (
                  <th key={statKey}>{statKey}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(stats[Object.keys(stats)[0]] || {}).map((statKey) => (
                <tr key={statKey}>
                  <td>{statKey}</td>
                  {Object.keys(stats).map((key) => (
                    <td key={key}>{stats[key][statKey]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {correlationHeatmap && (
        <div>
          <h3>Correlation Heatmap</h3>
          <img
            src={`data:image/png;base64,${correlationHeatmap}`}
            alt="Correlation Heatmap"
          />
        </div>
      )}
      <h3>Create a Plot</h3>
      <form onSubmit={handlePlot}>
        <div>
          <label>Plot Type</label>
          <select value={plotType} onChange={(e) => setPlotType(e.target.value)}>
            <option value="scatter">Scatter</option>
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="hist">Histogram</option>
            <option value="box">Box</option>
            <option value="violin">Violin</option>
          </select>
        </div>
        <div>
          <label>X Column</label>
          <select value={xColumn} onChange={(e) => setXColumn(e.target.value)}>
            {headers.map((header, index) => (
              <option key={index} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Y Column (Optional)</label>
          <select value={yColumn} onChange={(e) => setYColumn(e.target.value)}>
            <option value="">None</option>
            {headers.map((header, index) => (
              <option key={index} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hue (Optional)</label>
          <select value={hue} onChange={(e) => setHue(e.target.value)}>
            <option value="">None</option>
            {headers.map((header, index) => (
              <option key={index} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Generate Plot</button>
      </form>
      {plot && (
        <div>
          <h3>Generated Plot</h3>
          <img src={`data:image/png;base64,${plot}`} alt="Generated Plot" />
        </div>
      )}
      <button onClick={handlePrevious}>Previous</button>
    </div>
  );
};

// Prop types validation
StatsAndPlot.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  stats: PropTypes.object.isRequired,
  correlationHeatmap: PropTypes.string,
  plotType: PropTypes.string.isRequired,
  setPlotType: PropTypes.func.isRequired,
  xColumn: PropTypes.string.isRequired,
  setXColumn: PropTypes.func.isRequired,
  yColumn: PropTypes.string.isRequired,
  setYColumn: PropTypes.func.isRequired,
  hue: PropTypes.string.isRequired,
  setHue: PropTypes.func.isRequired,
  handlePlot: PropTypes.func.isRequired,
  plot: PropTypes.string,
  handlePrevious: PropTypes.func.isRequired,
};

export default StatsAndPlot;
