import React, { useState, useEffect } from 'react';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import fileImage from '../../img/file.png';
import NavigationMenu from '../accounts/NavigationMenu'

const FileList = () => {
  const [filesShown, setFilesShown] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("interval enter")
  //     if (window.files && window.files.length > 0) {
  //       setFilesShown(window.files);
  //       clearInterval(interval); 
  //     }
  //   }, 500);

  //   return () => {
  //     clearInterval(interval); 
  //   };
  // }, []);

  const handleDelete = async (fileId) => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.statusText === "OK") {
        navigate('/files')
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
    navigate(`/files/${fileId}/rename`, {
        fileName: fileName,
        fileComment: fileComment
    });
  };

  return (
    <>
      <NavigationMenu />
      <h2>Files</h2>
      {this.props.files.length === 0 ? (
      <p>File list is empty</p>
      ) : (
      <ul>
        {this.props.files.map((file) => (
          <li key={file.id}>
            <img
              src={fileImage}
              alt="file"
              onClick={() => handleImageClick(file.id)}
            />
            {file.name} ({file.size})
            <button onClick={() => handleFileClick(file.id)}>Open File Details</button>
            <button onClick={() => handleRename(file.id, file.name, file.comment)}>Change name and comment</button>
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
      )}
    </>
  );
};

export default FileList;