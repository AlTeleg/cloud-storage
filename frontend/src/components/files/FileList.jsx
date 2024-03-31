import React, { useState, useEffect } from 'react';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import fileImage from '../../img/file.png';

const FileList = () => {
  const [filesShown, setFilesShown] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await Api.getFiles();
      if (response.statusText === "OK") {
        if (response.data.files) {
          setFilesShown(response.data.files)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.statusText === "OK") {
        fetchFiles();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (fileId) => {
    navigate(`/files/${fileId}/download/`);
  };

  const handleFileClick = (fileId) => {
    navigate(`/files/${fileId}/`);
  };

  const handleRename = (fileId, fileName, fileComment) => {
    navigate(`/files/${fileId}/rename/`, {
        state: {
            fileName: fileName,
            fileComment: fileComment
        }
    });
};

  return (
    <>
      <h2>Files</h2>
      {filesShown.length === 0 ? (
      <p>File list is empty</p>
      ) : (
      <ul>
        {filesShown.map((file) => (
          <li className='file-li' key={file.id}>
            <img
              src={fileImage}
              alt="file"
              className='img-filelist-item'
              onClick={() => handleImageClick(file.id)}
            />
            <br />
            {file.name} - {file.size} bytes 
            <br />
            <button className='filelist-button' onClick={() => handleFileClick(file.id)}>Open File Details</button>
            <button className='filelist-button' onClick={() => handleRename(file.id, file.name, file.comment)}>Change name and comment</button>
            <button className='filelist-button' onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
      )}
    </>
  );
};

export default FileList;
