import React, { useState, useEffect, useNavigate } from 'react';
import api from '../../services/api';
import fileOtherImg from '../../img/file.png'
import NavigationMenu from './accounts/NavigationMenu'
import filetype from 'file-type';


const FileDetails = ({ fileId }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchFileDetails();
  });

  const fetchFileDetails = async () => {
    try {
      const response = await api.get('/files/${fileId}');
      setFile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await deleteFile(fileId);
      navigate('/files/')
    } catch (error) {
      console.error(error);
    }
  };

  if (!file) {
    return <div>Loading file details...</div>;
  }

  return (
    <div>
      <NavigationMenu/ >
      {guess_mime(file.file_data).startswith('image') ? (
        <img src={file.path} alt="Image" />
      ) : guess_mime(file.file_data).startswith('video') ? (
        <video src={file.path} controls />
      ) : (
        <img src={fileImg} alt="File" />
      )}
      <h2>File Details</h2>
      <p>File Name: {file.name}</p>
      <p>Comment: {file.comment}</p>
      <hr />
      <p>Original Name: {file.original_name}</p>
      <p>File Size: {file.size}</p>
      <p>Upload Date: {file.upload_date}</p>
      <p>Last Download Date: {file.last_download_date}</p>
      <hr />
      <p>Special download link: {window.location.host}{file.special_link}</p>
      <button onClick={() => handleDelete(file.id)}>Delete</button>
    </div>
  );
};

export default FileDetails;
