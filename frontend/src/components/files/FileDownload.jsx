import React from 'react';
import api from '../../services/api';
import NavigationMenu from '../accounts/NavigationMenu'

const FileDownload = (fileId) => {

  const downloadFile = async (fileId) => {
    try {
      const response = await api.get(`/files/${fileId}/download`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavigationMenu/ >
      <h2>Download File - id:{fileId}</h2>
      <button onClick={downloadFile}>Download</button>
    </div>
  );
};

export default FileDownload;