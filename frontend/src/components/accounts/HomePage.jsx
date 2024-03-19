import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Api from '../../services/api';

const HomePage = () => {

  const [files, setFiles] = useState([]);

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
          <li key={file.id}>
            {file.file_name} ({file.size})
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
