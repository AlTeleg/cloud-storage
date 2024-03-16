import React, { useState } from 'react';
import Api from '../../services/api';
import NavigationMenu from '../accounts/NavigationMenu'
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    try {
      const response = await Api.uploadFile(formData);
      if (response.ok) {
        setFile(null);
        setComment(null);
        navigate('/files')
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavigationMenu/ >
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" onChange={handleCommentChange} value={comment}/>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;