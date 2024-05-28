import PropTypes from "prop-types";
const Outliers = ({ headers, outlierOptions, handleOutlierOptionChange, handlePrevious, handleNext }) => (
  <div>
    <h3>Handling Outliers</h3>
    {headers.map((header, index) => (
      <div key={index}>
        <label>{header}</label>
        <select value={outlierOptions[header] || "none"} onChange={handleOutlierOptionChange(header)}>
          <option value="none">None</option>
          <option value="z_score">Z-Score</option>
          <option value="iqr">IQR</option>
        </select>
      </div>
    ))}
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
  </div>
);



// Prop types validation
Outliers.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  outlierOptions: PropTypes.object.isRequired,
  handleOutlierOptionChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default Outliers;
