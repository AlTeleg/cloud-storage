import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import fileImg from '../../img/file.png';
import NavigationMenu from '../accounts/NavigationMenu';
import FileViewer from 'react-file-viewer';

const FileDetails = ({ fileId }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFileDetails();
  }, []);

  const fetchFileDetails = async () => {
    try {
      const response = await Api.getFile(fileId);
      if (response.ok) {
        setFile(response.file);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.ok) {
        navigate('/files')
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!file) {
    return <div>Loading file details...</div>;
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const mediaTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

  return (
    <>
      <NavigationMenu />
      {mediaTypes.includes(fileExtension) ? (
        <FileViewer fileType={fileExtension} fileData={file.data} />
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
    </>
  );
};

export default FileDetails;
