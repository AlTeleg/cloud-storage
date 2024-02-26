import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import { loginUser, deleteUser, viewUserFiles, deleteFile, createUser, getUsers, getAllFiles } from '../../services/api';
import NavigationMenu from 'NavigationMenu.jsx'

const AdminInterface = () => {
  return (
    <div>
      <NavigationMenu/ >
      <h2>Admin Interface</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/create-user">Create User</Link>
          </li>
          <li>
            <Link to="/admin/all-users">All Users</Link>
          </li>
          <li>
            <Link to="/admin/all-files">All Files</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/admin/create-user" element={<CreateUser />} />
        <Route path="/admin/all-users" element={<AllUsers />} />
        <Route path="/admin/all-files" element={<AllFiles />} />
      </Routes>
    </div>
  );
};

const CreateUser = () => {
  const navigate = useNavigate();
  const [IsAdmin, setIsAdmin] = useState(False)
  const [IsSuperuser, setIsSuperuser] = useState(False)

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: e.target.username.value,
        password: e.target.password.value,
        permissions: {
          is_admin: IsAdmin,
          is_superuser: IsSuperuser,
        },
      };
      await createUser(userData);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleAdminCheckboxChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleSuperuserCheckboxChange = (e) => {
    setIsSuperuser(e.target.checked);
  };

  const handleBackHome = () => {
    navigate('/admin/')
  };

  return (
    <div>
      <h3>Create User</h3>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <label>
            <input type="checkbox" name="is_admin"  onChange={handleAdminCheckboxChange}/>
            Is admin
        </label>
        <label >
            <input type="checkbox" name="is_superuser" onChange={handleSuperuserCheckboxChange}/>
            Is superuser
        </label>
        <button type="submit">Create User</button>
      </form>
      <hr />
      <button onClick={handleBackHome}>Back to home</button>
    </div>
  );
};

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleViewUserFiles = async (userId) => {
    try {
      const userData = await getAllFiles(userId);
      setSelectedUser(userData);
    } catch (error) {
      console.error('Failed to fetch user files:', error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await deleteFile(fileId);
      fetchFiles();
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const fetchFiles = async () => {
    try {
      const filesData = await getAllFiles();
      setFiles(filesData);
    } catch (error) {
      console.error('Failed to get files:', error);
    }
  };


  const handleGoBack = () => {
    setSelectedUser(null);
  };

  const handleBackHome = () => {
    navigate('/admin/')
  };

  return (
    <div>
      {selectedUser ? (
        <div>
          <h3>
            Selected User: {selectedUser.username}{' '}
            <button onClick={handleGoBack}>Go Back</button>
          </h3>
          <h4>Files:</h4>
          <ul>
            {selectedUser.files.map((file) => (
              <li key={file.id}>
                {file.name}
                <button onClick={() => handleDeleteFile(file.id)}>Delete File</button>
              </li>
              <button onClick={() => handleDeleteUser(selectedUser.id)}>Delete User</button>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h3>Users:</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}
                <button onClick={() => handleViewUserFiles(user.id)}>View Files</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
              </li>
            ))}
          </ul>
        </div>
          )}
        <hr />
        <button onClick={handleBackHome}>Back to home</button>
    </div>
  );
};

const AllFiles = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFilterField, setSelectedFilterField] = useState(null);
  const [selectedSortField, setSelectedSortField] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [h3Option, setH3Option] = useState('Last day files');

  useEffect(() => {
    fetchFiles();
  }, []);

   const fieldOptions = [
      { value: 'user', label: 'User' },
      { value: 'original_name', label: 'Original Name' },
      { value: 'name', label: 'Name' },
      { value: 'size', label: 'Size' },
      { value: 'upload_date', label: 'Upload Date' },
      { value: 'last_download_date', label: 'Last Download Date' }
   ];

  const fetchFiles = async (sort='upload_date', filter=None) => {
    try {
      const filesData = await getAllFiles();
      setFiles(filesData);
    } catch (error) {
      console.error('Failed to get files:', error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await deleteFile(fileId);
      fetchFiles(selectedSortField, selectedFilterField, filterValue);
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleApplyFilterAndSort = () => {
    fetchFiles(selectedSortField, selectedFilterField, filterValue)
    setH3Option('Files');
  };

  const handleRadioFilterChange = (value) => {
    setSelectedFilterField(value);
  };

  const handleRadioSortChange = (value) => {
    setSelectedSortField(value);
  };

  const handleBackHome = () => {
    navigate('/admin/')
  };


  return (
    <div>
      <h3>{h3Option}</h3>

      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name}
            <button onClick={() => handleDeleteFile(file.id)}>Delete File</button>
          </li>
        ))}
      </ul>
      <h4>Sort by:</h4>
      <ul>
        {fieldOptions.map((option) => (
            <li key={option.value}>
                <label>
                    <input
                        type="radio"
                        name="field"
                        value={option.value}
                        checked={selectedField === option.value}
                         onChange={() => handleRadioSortChange(option.value)}
                    />
                    {option.label}
                </label>
            </li>
          ))}
      </ul>
      <h4>Filter by:</h4>
      <ul>
        {fieldOptions.map((option) => (
            <li key={option.value}>
                <label>
                    <input
                        type="checkbox"
                        name="filterField"
                        value={option.value}
                        checked={selectedField === option.value}
                        onChange={() => handleRadioFilterChange(option.value)}
                    />
                    {option.label}
                </label>
            </li>
        ))}
      </ul>

      <h4>Filter Value:</h4>
      <input
        type="text"
        value={filterValue}
        placeholder={selectedFilterField}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <button onClick={handleApplyFilterAndSort}>Apply Filter and Sort</button>
      <hr />
       <button onClick={handleBackHome}>Back to home</button>
    </div>
  );
};

const AdminInterfaceWrapper = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminInterface />} />
    </Routes>
  );
};

export default AdminInterfaceWrapper;