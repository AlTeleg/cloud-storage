import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from '../../services/api';
import fileImg from '../../img/file.png';
import FileViewer from 'react-file-viewer';

const FileDetails = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFileDetails();
  }, []);

  const fetchFileDetails = async () => {
    try {
      const response = await Api.getFile(fileId);
      if (response.statusText === "OK") {
        const fetchedFile = response.data.file;
        setFile(fetchedFile);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.statusText === "OK") {
        navigate('-1');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const base64ToArrayBuffer = async (base64) => {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return bytes.buffer;
  }

  if (!file) {
    return <div>Loading file details...</div>;
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const mediaTypes = ['pdf', 'docx', 'png', 'xlsx', 'jpeg', 'gif', 'bmp', 'csv', 'mp4', 'webm', 'mp3'];


  return (
    <>
      {fileExtension === 'txt' ? (
        <>
          <p>{new FileReader().readAsText(base64ToArrayBuffer(file.data))}</p>
          <br />
        </>
      ) : (
        mediaTypes.includes(fileExtension) ? (
          <FileViewer fileType={fileExtension} filePath={base64ToArrayBuffer(file.data)} />
        ) : (
          <img src={fileImg} alt="File" />
        )
      )}
      <h2>File Details</h2>
      <p>File Name: {file.name}</p>
      <p>Comment: {file.comment}</p>
      <hr />
      <p>Original Name: {file.original_name}</p>
      <p>File Size: {file.size}</p>
      <p>Upload Date: {new Date(file.upload_date).toLocaleDateString()}</p>
      <p>Last Download Date: {new Date(file.last_download_date).toLocaleDateString() || 'Never'}</p>
      <hr />
      <p>Special download link: <a href={`${window.location.origin}${file.special_link}`}>{window.location.origin}{file.special_link}</a></p>
      <button onClick={() => handleDelete(file.id)}>Delete</button>
    </>
  );
};

export default FileDetails;
