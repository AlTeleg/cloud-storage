import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../../services/api';
import NavigationMenu from '../accounts/NavigationMenu';

const FileDownload = () => {
  const navigate = useNavigate();
  const { fileId } = useParams();

  const downloadFile = async () => {
    try {
      
      const response = await Api.downloadFile(fileId);
      if (response.statusText === "OK" && response.data) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `file_${fileId}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        navigate('/files'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Download File - id: {fileId}</h2>
      <button onClick={downloadFile}>Download</button>
    </>
  );
};

export default FileDownload;
