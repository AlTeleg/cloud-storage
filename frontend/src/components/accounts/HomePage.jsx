import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchFiles = async () => {
      try {
        const response = await Api.getFiles();
        if (response.statusText === "OK") {
          if (response.data.files) {
            setFiles(response.data.files);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const handleClick = async (fileId) => {
    navigate(`files/${fileId}`)
  }

  const sortedFiles = files.sort((a, b) =>
    new Date(b.last_download_date) - new Date(a.last_download_date)
  );
  const lastDownloadedFiles = sortedFiles.slice(0, 5);
  
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
          <li key={file.id} className='last-downloaded-file-item' onClick={handleClick(file.id)}>
            {file.name} - {file.size}byte
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
