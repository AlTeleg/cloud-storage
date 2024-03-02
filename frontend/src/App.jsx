import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/accounts/HomePage';
import RegistrationForm from './components/accounts/RegistrationForm';
import LoginForm from './components/accounts/LoginForm';
import AdminInterfaceWrapper from './components/accounts/AdminInterface';
import FileList from  './components/files/FileList';
import FileChange from  './components/files/FileChange';
import FileUpload from  './components/files/FileUpload';
import FileDownload from  './components/files/FileDownload';
import FileDetails from './components/files/FileDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/files" element={<FileList />} />
        <Route path="/files/upload" element={<FileUpload />} />
        <Route path="/files/:fileId" element={<FileDetails />} />
        <Route path="/files/:fileId/download" element={<FileDownload />} />
        <Route path="/files/:fileId/rename" element={<FileChange />} />
        <Route path="/files/:fileId/comment" element={<FileChange />} />
        <Route path="/admin/*" element={<AdminInterfaceWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
