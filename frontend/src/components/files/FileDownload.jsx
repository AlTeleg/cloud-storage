import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import NavigationMenu from '../accounts/NavigationMenu';

const FileDownload = ({ fileId }) => {
  const navigate = useNavigate();

  const downloadFile = async () => {
    try {
      const response = await Api.downloadFile(fileId);
      if (response.ok) {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `file_${fileId}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        navigate('/files/'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavigationMenu />
      <h2>Download File - id: {fileId}</h2>
      <button onClick={downloadFile}>Download</button>
    </div>
  );
};

export default FileDownload;
