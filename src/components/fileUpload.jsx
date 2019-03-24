import React from "react";
const FileUpload = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <div className="form-group">
        <label htmlFor="fileUpload">Upload Store details (CSV)</label>
        <input type="file" className="form-control-file" id="fileUpload" />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FileUpload;
