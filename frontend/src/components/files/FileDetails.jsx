import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../services/api';
import fileImg from '../../img/file.png';
import FileViewer from 'react-file-viewer';

const FileDetails = () => {
  const [file, setFile] = useState(null);
  const { fileId } = useParams();

  useEffect(() => {
    fetchFileDetails();
  }, []);

  const fetchFileDetails = async () => {
    try {
      const response = await Api.getFile(fileId);
      if (response.statusText === "OK") {
        if (response.data.file) {
          setFile(response.data.file)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.statusText === "OK") {
        fetchFileDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!file) {
    return <div>Loading file details...</div>;
  }
  
  const fileExtension = file.name.split('.').pop().toLowerCase() || '';
  const mediaTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

  return (
    <>
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
      <p>Upload Date: {new Date(file.upload_date).toLocaleDateString()}</p>
      <p>Last Download Date: {new Date(file.last_download_date).toLocaleDateString()}</p>
      <hr />
      <p>Special download link: <a href={window.location.host + file.special_link}>{window.location.host}{file.special_link}</a></p>
      <button onClick={() => handleDelete(file.id)}>Delete</button>
    </>
  );
};

export default FileDetails;
