import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();
  const [lastDownloadedFiles, setLastDownloadedFiles] = useState([]);

  useEffect(() => {

    const fetchFiles = async () => {
      try {
        const response = await Api.getFiles();
        if (response.statusText === "OK") {
          if (response.data.files) {
            const sortedFiles = response.data.files.sort((a, b) =>
            new Date(b.upload_date) - new Date(a.upload_date)
          );
          console.log(sortedFiles);
          setLastDownloadedFiles(sortedFiles.slice(0, 5));
          console.log(lastDownloadedFiles);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const handleClick = async (fileId) => {
    navigate(`/files/${fileId}`)
  }


  
  return (
    <>
      <h1>Welcome to Your Storage</h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/files/upload">Upload File</NavLink>
          </li>
          <li>
            <NavLink to="/files">All Files</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>

      <h2>Last Downloaded</h2>
      <ul>
        {lastDownloadedFiles.map((file) => (
          <li key={file.id} className='last-downloaded-file-item' onClick={() => handleClick(file.id)}>
            {file.name} - {file.size}byte
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
