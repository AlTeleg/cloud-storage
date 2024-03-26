import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/accounts/HomePage';
import RegistrationForm from './components/accounts/RegistrationForm';
import LoginForm from './components/accounts/LoginForm';
import {AdminInterface, CreateUser, AllUsers, AllFiles } from './components/accounts/AdminInterface';
import FileList from  './components/files/FileList';
import FileChange from  './components/files/FileChange';
import FileUpload from  './components/files/FileUpload';
import FileDownload from  './components/files/FileDownload';
import FileDetails from './components/files/FileDetails';
import Logout from './components/accounts/Logout';
import NavigationMenu from './components/accounts/NavigationMenu';

const App = () => {
  return (
    <Router>
      <NavigationMenu />
      <div className="app">
        <Routes>
          <Route path="/home" element={<HomePage />} name="home"/>
          <Route path="/register" element={<RegistrationForm />} name="register"/>
          <Route path="/login" element={<LoginForm />} name="login"/>
          <Route path="/logout" element={<Logout />} name="logout"/>
          <Route path="/files" element={<FileList />} name="file-list"/>
          <Route path="/files/upload" element={<FileUpload />} name="file-upload"/>
          <Route path="/files/:fileId" element={<FileDetails />} name="file-details"/>
          <Route path="/files/:fileId/download" element={<FileDownload />} name="file-download"/>
          <Route path="/files/:fileId/rename" element={<FileChange />} name="file-change-rename"/>
          <Route path="/files/:fileId/comment" element={<FileChange />} name="file-change-comment"/>
          <Route path="/admin" element={<AdminInterface />} name='admin'/>
          <Route path="/admin/create-user" element={<CreateUser />} name='admin-create-user' />
          <Route path="/admin/users" element={<AllUsers />} name='admin-users' />
          <Route path="/admin/files" element={<AllFiles />} name='admin-files' /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
