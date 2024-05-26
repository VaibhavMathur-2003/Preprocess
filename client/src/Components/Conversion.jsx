import PropTypes from "prop-types";

const Conversion = ({ headers, conversionOptions, handleConversionOptionChange, handlePrevious, handleNext }) => {
  return (
    <div>
      <h3>Data Conversion</h3>
      {headers.map((header, index) => (
        <div key={index}>
          <label>{header}</label>
          <select
            value={conversionOptions[header] || "none"}
            onChange={(event) => handleConversionOptionChange(header, event.target.value)} // Pass header and selected value to handleConversionOptionChange
          >
            <option value="none">None</option>
            <option value="string">String</option>
            <option value="integer">Integer</option>
            <option value="float">Float</option>
            <option value="datetime">Datetime</option>
          </select>
        </div>
      ))}
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

// Prop types validation
Conversion.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  conversionOptions: PropTypes.object.isRequired,
  handleConversionOptionChange: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default Conversion;
