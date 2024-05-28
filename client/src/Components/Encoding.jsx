import PropTypes from "prop-types";


const Encoding = ({ headers, encodingOptions, handleEncodingOptionChange, handlePrevious, handleNext }) => (
  <div>
    <h3>Encoding</h3>
    {headers.map((header, index) => (
      <div key={index}>
        <label>{header}</label>
        <select value={encodingOptions[header] || "none"} onChange={handleEncodingOptionChange(header)}>
          <option value="none">None</option>
          <option value="label">Label Encoding</option>
          <option value="onehot">One-Hot Encoding</option>
        </select>
      </div>
    ))}
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
  </div>
);



// Prop types validation
Encoding.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  encodingOptions: PropTypes.object.isRequired,
  handleEncodingOptionChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default Encoding;
