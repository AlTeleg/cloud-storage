import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Api from '../../services/api';
import NavigationMenu from '../accounts/NavigationMenu'

const FileChange = () => {
  const location = useLocation();
  const { fileName, fileComment } = location;
  const { fileId } = useParams();
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState(fileName);
  const [comment, setComment] = useState(fileComment);
  const navigate = useNavigate();


  const handleRename = async () => {
    try {
      const response = await Api.renameFile(fileId, { "name": newName });
      if (response.statusText === "OK") {
        setName(newName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      const response = await Api.commentFile(fileId, { "comment": newComment });
      if (response.statusText === "OK") {
        setComment(newComment);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.statusText === "OK") {
        navigate('/files')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h4>Actions for file: {name}</h4>
      <input
        type="text"
        placeholder="New name"
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
      <button onClick={handleRename}>Rename</button>

      <h3>Comment: {comment}</h3>
      <input
        type="text"
        placeholder="Comment"
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
      />
      <button onClick={handleUpdateComment}>Update Comment</button>

      <button onClick={() => handleDelete(file.id)}>Delete</button>
    </>
  );
};

export default FileChange;
