import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavigationMenu from './NavigationMenu'
import Api from '../../services/api';

const HomePage = () => {

  const [files, setFiles] = useState([]);

  useEffect(() => {

    const fetchFiles = async () => {
      try {
        const response = await Api.getFiles();
        if (response.ok) {
          setFiles(response.files);
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
    <div>
      <NavigationMenu/ >
      <h1>Welcome to Your Storage</h1>

      <nav>
        <ul>
          <li>
            <NavLink to="file-upload">Upload File</NavLink>
          </li>
          <li>
            <NavLink to="file-list">All Files</NavLink>
          </li>
          <li>
            <NavLink to="logout">Logout</NavLink>
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
    </div>
  );
};

export default HomePage;
