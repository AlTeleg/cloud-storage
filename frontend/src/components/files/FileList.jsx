import React, { useState, useEffect } from 'react';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import fileImage from '../../img/file.png';
import NavigationMenu from '../accounts/NavigationMenu'

const FileList = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await Api.getFiles();
      if (response.ok) {
        setFiles(response.files);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.ok) {
        fetchFiles();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (fileId) => {
    navigate(`/files/${fileId}/download`);
  };

  const handleFileClick = (fileId) => {
    navigate(`/files/${fileId}`);
  };

  const handleRename = (fileId, fileName, fileComment) => {
    navigate(`/files/${fileId}/rename`,{
        fileName: fileName,
        fileComment: fileComment
    });
  };

  return (
    <div>
      <NavigationMenu/ >
      <h2>Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <img
              src={fileImage}
              alt="file"
              onClick={() => handleImageClick(file.id)}
            />
            {file.name} ({file.size})
            <button onClick={() => handleFileClick(file.id)}>Open File Details</button>
            <button onClick={() => handleRename(file.id, file.name, file.comment)}>Rename</button>
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
