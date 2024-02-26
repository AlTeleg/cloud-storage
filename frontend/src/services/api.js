import axios from 'axios';
import DB_HOST from './config'

const api = axios.create({
  baseURL: DB_HOST
});

export const loginUser = async userData => {
  try {
    const response = await api.post('/login/', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const registerUser = async userData => {
  try {
    const response = await api.post('/register/', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`/api/users/${userId}`);
    console.log('User deleted successfully');
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

export const getFiles = async () => {
  try {
    const response = await api.get('/files/');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const uploadFile = async formData => {
  try {
    const response = await api.post('/files/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


export const deleteFile = async fileId => {
  try {
    const response = await api.delete('/files/${fileId}/');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateFile = async (fileId, updatedData) => {
  try {
    const response = await api.put(`/files/${fileId}/`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const downloadFile = async fileId => {
  try {
    const response = await api.get('/files/${fileId}/download', {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUsers = async fileId => {
  try {
    const response = await api.get('/admin/users/');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createUser = async fileId => {
  try {
    const response = await api.post('/admin/create-user/');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


export const getAllFiles = async (sort='upload_date', filter=None) => {
  try {
      const response = await api.get('/admin/files/', {
          params: {
            sort: sort,
            filter: filter
          }
      });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default api;
