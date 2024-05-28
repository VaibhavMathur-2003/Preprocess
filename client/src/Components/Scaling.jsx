import PropTypes from "prop-types";


const Scaling = ({ headers, scalingOptions, handleScalingOptionChange, removeDuplicates, handleRemoveDuplicatesChange, handlePrevious, handleNext }) => (
  <div>
    <h3>Scaling</h3>
    {headers.map((header, index) => (
      <div key={index}>
        <label>{header}</label>
        <select value={scalingOptions[header] || "none"} onChange={handleScalingOptionChange(header)}>
          <option value="none">None</option>
          <option value="normalization">Normalization</option>
          <option value="standardization">Standardization</option>
        </select>
      </div>
    ))}
    <div>
      <label>
        <input type="checkbox" checked={removeDuplicates} onChange={handleRemoveDuplicatesChange} />
        Remove duplicate entries
      </label>
    </div>
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
  </div>
);


// Prop types validation
Scaling.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  scalingOptions: PropTypes.object.isRequired,
  handleScalingOptionChange: PropTypes.func.isRequired,
  removeDuplicates: PropTypes.bool.isRequired,
  handleRemoveDuplicatesChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default Scaling;
