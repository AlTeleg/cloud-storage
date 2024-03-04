import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import NavigationMenu from '../accounts/NavigationMenu'

const FileChange = ({ fileId, fileName, fileComment}) => {
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState(fileName);
  const [comment, setComment] = useState(fileComment);
  const navigate = useNavigate();

  const handleRename = async () => {
    try {
      const response = await Api.renameFile(fileId, newName);
      if (response.ok) {
        setName(newName);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateComment = async () => {
    try {
      const response = await Api.commentFile(fileId, newComment);
      if (response.ok) {
        setComment(newComment);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (fileId) => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.ok) {
        navigate('/files/')
      }
    } catch (e) {
      console.error(e);
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
