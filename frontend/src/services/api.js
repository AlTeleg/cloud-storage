import axios from 'axios';
import HOST from './config';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: HOST
    });
  }

  async loginUser(userData) {
    try {
      const response = await this.api.post('/login/', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async logoutUser() {
    try {
      const response = await this.api.post('/logout/');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async registerUser(userData) {
    try {
      const response = await this.api.post('/register/', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async deleteUser(userId) {
    try {
      await this.api.delete(`admin/users/${userId}`);
      console.log('User deleted successfully');
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }

  async getFiles() {
    try {
      const response = await this.api.get('/files/');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getFile(fileid) {
    try {
      const response = await this.api.get(`/files/${fileid}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async uploadFile(formData) {
    try {
      const response = await this.api.post('/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.api.delete(`/files/${fileId}/delete`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async downloadFile(fileId) {
    try {
      const response = await this.api.get(`/files/${fileId}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async commentFile(fileId, newComment) {
    try {
      const response = await this.api.patch(`/files/${fileId}/comment`, newComment);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async renameFile(fileId, newName) {
    try {
      const response = await this.api.patch(`/files/${fileId}/rename`, newName);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getUsers() {
    try {
      const response = await this.api.get('/admin/users/');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async createUser() {
    try {
      const response = await this.api.post('/admin/create-user/');
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getAllFiles(sort = 'upload_date', filter = null) {
    try {
      const response = await this.api.get('/admin/files/', {
        params: {
          sort: sort,
          filter: filter
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}

export default new Api();
