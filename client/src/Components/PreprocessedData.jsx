import PropTypes from "prop-types";


const PreProcessedData = ({ firstFiveRows, handlePrevious, handleNext }) => (
  <div>
    <h3>First Five Rows of Preprocessed Data</h3>
    {firstFiveRows.length > 0 && (
      <table>
        <thead>
          <tr>
            {Object.keys(firstFiveRows[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {firstFiveRows.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
  </div>
);



// Prop types validation
PreProcessedData.propTypes = {
  firstFiveRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default PreProcessedData;
