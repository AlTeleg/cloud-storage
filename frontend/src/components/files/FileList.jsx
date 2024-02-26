import React, { useState, useEffect } from 'react';
import { getFiles, deleteFile} from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import fileImage from '../../img/file.png';
import NavigationMenu from './accounts/NavigationMenu'

const FileList = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const files = await getFiles();
      setFiles(files);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await deleteFile(fileId);
      fetchFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (fileId) => {
    navigate(`/files/${fileId}/download`, { fileId: fileId });
  };

  const handleFileClick = (fileId) => {
    navigate(`/files/${fileId}/`, { fileId: fileId });
  };

  const handleRename = (fileId) => {
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
            <button onClick={() => handleRename(file.id)}>Rename</button>
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
