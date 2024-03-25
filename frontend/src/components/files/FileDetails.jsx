import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../services/api';
import fileImg from '../../img/file.png';
import FileViewer from 'react-file-viewer';

const FileDetails = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);

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
        fetchFileDetails();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!file) {
    return <div>Loading file details...</div>;
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const mediaTypes = ['pdf', 'docx', 'png', 'xlsx', 'jpeg', 'gif', 'bmp', 'csv', 'mp4', 'webm', 'mp3'];

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setFile((prevFile) => ({ ...prevFile, data: fileContent }));
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <>
      {fileExtension === 'txt' ? (
        <input type="file" accept=".txt" onChange={handleFileChange} />
      ) : (
        mediaTypes.includes(fileExtension) ? (
          <FileViewer fileType={fileExtension} filePath={file.data} />
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
      <p>Last Download Date: {new Date(file.last_download_date).toLocaleDateString()}</p>
      <hr />
      <p>Special download link: <a href={`${window.location.origin}${file.special_link}`}>{window.location.origin}{file.special_link}</a></p>
      <button onClick={() => handleDelete(file.id)}>Delete</button>
    </>
  );
};

export default FileDetails;
