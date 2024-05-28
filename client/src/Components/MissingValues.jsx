import PropTypes from "prop-types";


const MissingValues = ({ headers, preprocessingOptions, handlePreprocessingOptionChange, handlePrevious, handleNext }) => (
  <div>
    <h3>Handling Missing Values</h3>
    {headers.map((header, index) => (
      <div key={index}>
        <label>{header}</label>
        <select value={preprocessingOptions[header] || "none"} onChange={handlePreprocessingOptionChange(header)}>
          <option value="none">None</option>
          <option value="mean">Mean</option>
          <option value="median">Median</option>
          <option value="most_frequent">Most Frequent</option>
          <option value="remove">Remove</option>
        </select>
      </div>
    ))}
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
  </div>
);



// Prop types validation
MissingValues.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  preprocessingOptions: PropTypes.object.isRequired,
  handlePreprocessingOptionChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default MissingValues;
