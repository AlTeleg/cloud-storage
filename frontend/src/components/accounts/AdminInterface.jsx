import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../../services/api';


export const CreateUser = () => {
  const navigate = useNavigate();
  const [IsAdmin, setIsAdmin] = useState(false)
  const [IsSuperuser, setIsSuperuser] = useState(false)

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: e.target.username.value,
        password: e.target.password.value,
        full_name: e.target.full_name.value || 'Not provided',
        email: e.target.email.value || 'noemail@admin.com',
        permissions: {
          is_admin: IsAdmin,
          is_superuser: IsSuperuser,
        },
      };
      const response = await Api.createUser(userData);
      if (response.statusText === "OK") {
        navigate('/admin/users')
      }
    } catch (e) {
      console.error('Failed to create user:', e);
    }
  };

  const handleAdminCheckboxChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleSuperuserCheckboxChange = (e) => {
    setIsSuperuser(e.target.checked);
  };

  const handleBackHome = () => {
    navigate('/admin')
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
        <input
          type="text"
          name="full_name"
          placeholder="Full name"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
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

export const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserFiles, setSelectedUserFiles] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await Api.getUsers();
      if (response.statusText === "OK") {
        if (response.data.users) {
          setUsers(response.data.users);
        }
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await Api.deleteUser(userId);
      if (response.statusText === "OK") {
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleViewUserFiles = async (userId, username) => {
    try {
      let sort ='upload_date';
      let filter='user';
      const response = await Api.getAllFiles(sort, filter, userId);
      if (response.statusText === "OK") {
        setSelectedUser(username);
        if (response.data.files) {
          setSelectedUserFiles(response.data.files);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user files:', error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await Api.getAllFiles();
      if (response.statusText === "OK") {
        if (response.data.files) {
          setFiles(response.data.files);
        }
      }
    } catch (error) {
      console.error('Failed to get files:', error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.statusText === "OK") {
        fetchFiles();
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleGoBack = () => {
    setSelectedUserFiles(null);
    setSelectedUser(null);
  };

  const handleBackHome = () => {
    navigate('/admin')
  };

  return (
    <>
      {selectedUser ? (
        <div>
          <h3>
            Selected User: {selectedUser.username}
            <button onClick={handleGoBack}>Go Back</button>
          </h3>
          <h4>Files:</h4>
          <ul>
            {selectedUserFiles.map((file) => (
              <li key={file.id}>
                {file.name}
                <button onClick={() => handleDeleteFile(file.id)}>Delete File</button>
              </li>
            ))}
          </ul>
          <button onClick={() => handleDeleteUser(selectedUser.id)}>Delete User</button>
        </div>
      ) : (
        <div>
          <h3>Users:</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>Id: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Full name:{user.full_name}</p>
                <p>Email: {user.email}</p>
                <p>Is admin:{user.is_admin}</p>
                <button onClick={() => handleViewUserFiles(user.id, user.username)}>View Files</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr />
      <button onClick={handleBackHome}>Back to home</button>
    </>
  );
};

export const AllFiles = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFilterField, setSelectedFilterField] = useState(null);
  const [selectedSortField, setSelectedSortField] = useState('upload_date');
  const [filterValue, setFilterValue] = useState(null);
  const [h3Option, setH3Option] = useState('Last day files');

  useEffect(() => {
    fetchFiles();
  }, []);

   const fieldOptions = [
      { value: 'user_id', label: 'User id' },
      { value: 'username', label: 'Username'},
      { value: 'original_name', label: 'Original Name' },
      { value: 'name', label: 'Name' },
      { value: 'size', label: 'Size +-10%' },
      { value: 'upload_date', label: 'Upload Date - dd.mm.yyyy' },
      { value: 'last_download_date', label: 'Last Download Date - dd.mm.yyyy' }
   ];

  const fetchFiles = async () => {
    try {
      const response = await Api.getAllFiles(selectedSortField, selectedFilterField, filterValue);
      if (response.statusText === "OK") {
        if (response.data.files) {
          setFiles(response.data.files);
        }
      }
    } catch (e) {
      console.error('Failed to get files:', e);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const response = await Api.deleteFile(fileId);
      if (response.statusText === "OK") {
        fetchFiles();
      }
    } catch (e) {
      console.error('Failed to delete file:', e);
    }
  };

  const handleApplyFilterAndSort = () => {
    fetchFiles()
    setH3Option('Files');
  };

  const handleRadioFilterChange = (value) => {
    setSelectedFilterField(value);
  };

  const handleRadioSortChange = (value) => {
    setSelectedSortField(value);
  };

  const handleBackHome = () => {
    navigate('/admin')
  };


  return (
    <>
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
                        checked={selectedSortField === option.value}
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
                        checked={selectedFilterField === option.value}
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
    </>
  );
};


export const AdminInterface = () => {
  return (
    <>
      <h2>Admin Interface</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/create-user">Create User</Link>
          </li>
          <li>
            <Link to="/admin/users">All Users</Link>
          </li>
          <li>
            <Link to="/admin/files">All Files</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
