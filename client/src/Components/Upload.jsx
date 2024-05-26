import PropTypes from 'prop-types';

const Upload = ({ handleFileChange, handleUpload, error }) => {
  return (
    <div>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

Upload.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  error: PropTypes.string
};


export default Upload;
