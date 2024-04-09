import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();
  const [lastDownloadedFiles, setLastDownloadedFiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    
    const isAdminStored = sessionStorage.getItem('isAdmin');
    if (isAdminStored === null) {
       checkAdminStatus();
    } else {
       setIsAdmin(isAdminStored === 'true');
    }

    const fetchFiles = async () => {
      try {
        const response = await Api.getFiles();
        if (response.statusText === "OK") {
          if (response.data.files) {
            const sortedFiles = response.data.files.sort((a, b) =>
            new Date(b.upload_date) - new Date(a.upload_date)
          );
          setLastDownloadedFiles(sortedFiles.slice(0, 5));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const checkAdminStatus = async () => {
    try {
       const response = await Api.api.get('admin/');
       if (response.statusText === "OK") {
          setIsAdmin(true);
          sessionStorage.setItem('isAdmin', 'true');
       }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setIsAdmin(false);
        sessionStorage.setItem('isAdmin', 'false');
     } else {
        console.error(error);
     }
  }
 }

  const handleClick = (fileId) => {
    navigate(`/files/${fileId}/`)
  }

  return (
    <>
      <h1>Welcome to Your Storage</h1>

      <nav>
        <ul>
          <li className='home-li'>
            <NavLink to="/files/upload/">Upload File</NavLink>
          </li>
          <li className='home-li'>
            <NavLink to="/files/">All Files</NavLink>
          </li>
          {isAdmin && (
            <li className='home-li'>
              <NavLink to="/admin/">Admin</NavLink>
            </li>
          )}
          <li className='home-li'>
            <NavLink to="/logout/">Logout</NavLink>
          </li>
        </ul>
      </nav>

      <h2>Last Downloaded</h2>
      <ul>
        {lastDownloadedFiles.map((file) => (
          <li key={file.id} className='last-downloaded-file-item' onClick={() => handleClick(file.id)}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
