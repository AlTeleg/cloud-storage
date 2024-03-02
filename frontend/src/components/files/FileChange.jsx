import React, { useState, useLocation } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import NavigationMenu from '../accounts/NavigationMenu'

const FileChange = ({ fileId, fileName, fileComment }) => {
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState(fileName);
  const [сomment, setСomment] = useState(fileComment);
  const navigate = useNavigate();

  const handleRename = async () => {
    try {
      await api.patch(`/files/${fileId}/rename`, { newName });
      setName(newName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      await api.patch(`/files/${fileId}/comment`, { newComment });
      setComment(newComment);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await deleteFile(fileId);
      navigate('/files/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavigationMenu/ >
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
    </div>
  );
};

export default FileChange;