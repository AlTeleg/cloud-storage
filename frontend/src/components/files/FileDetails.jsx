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
    fetchFileDetails()
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
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };


  if (!file) {
    return <div>Loading file details...</div>;
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const mediaTypes = ['pdf', 'docx', 'png', 'xlsx', 'jpeg', 'gif', 'bmp', 'csv', 'mp4', 'webm', 'mp3', 'jpg'];

  return (
    <>
      {fileExtension === 'txt' ? (
        <>
          <p>{atob(file.data)}</p>
        </>
      ) : (
        mediaTypes.includes(fileExtension) ? (
          <>
            {['mp3', 'mp4', 'webm'].includes(fileExtension) ? (
              <>
                {fileExtension === 'mp3' ? (
                  <audio controls>
                    <source src={`data:${fileExtension};base64,${file.data}`} type={`audio/${fileExtension}`} />
                  </audio>
                ) : (
                  <video controls>
                    <source src={`data:${fileExtension};base64,${file.data}`} type={`video/${fileExtension}`} />
                  </video>
                )}
              </>
            ) : (
              <FileViewer fileType={fileExtension} filePath={`data:${fileExtension};base64,${file.data}`} />
            )}
          </>
        ) : (
          <img src={fileImg} alt="File" />
        )
      )}
      <br />
      <h2>File Details</h2>
      <p>File Name: {file.name}</p>
      <p>Comment: {file.comment == 'null' ? '' : file.comment}</p>
      <hr />
      <p>Original Name: {file.original_name}</p>
      <p>File Size: {file.size} bytes</p>
      <p>Upload Date: {new Date(file.upload_date).toLocaleDateString()}</p>
      <p>Last Download Date: {file.last_download_date == 'None' ? 'never downloaded' : new Date(file.last_download_date).toLocaleDateString()}</p>
      <hr />
      <p>Special download link: <a href={`${window.location.origin}${file.special_link}`}>{window.location.origin}{file.special_link}</a></p>
      <button className='file-details-delete-btn'onClick={() => handleDelete(file.id)}>Delete</button>
    </>
  );
};

export default FileDetails;
