import React, { useState } from 'react';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState(null);
  const [uploading, setUploading] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    setError(null);
    setUploading('Uploading...');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    try {
      const response = await Api.uploadFile(formData);
      if (response.statusText === "OK") {
        setFile(null);
        setComment(null);
        setUploading(null);
        navigate('/files/');
      }

    } catch (error) {
      console.error(error);
      setUploading(null);
      if (error.response.data.error) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <>
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        {uploading && <p>{uploading}</p>}
        {error && <p>{error}</p>}
        <h4>Set file comment:</h4>
        <input type="text" onChange={handleCommentChange} value={comment}/>
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default FileUpload;
