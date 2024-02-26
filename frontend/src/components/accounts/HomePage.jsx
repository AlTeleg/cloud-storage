import React, { useEffect, useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import FileUpload from '../files/FileUpload';
import FileList from '../files/FileList';
import NavigationMenu from 'NavigationMenu'

const HomePage = () => {

  const [files, setFiles] = useState([]);

  useEffect(() => {

    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files');
        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        console.log(error);
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

      <Routes>
        <Route path="/upload-file" element={<FileUpload />} />
        <Route path="/all-files" element={<FileList />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

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