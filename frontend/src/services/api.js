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
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async logoutUser() {
    try {
      const response = await this.api.post('/logout/');
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async registerUser(userData) {
    try {
      const response = await this.api.post('/register/', userData);
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.api.delete(`admin/users/${userId}`);
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async getFiles() {
    try {
      const response = await this.api.get('/files/');
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async getFile(fileid) {
    try {
      const response = await this.api.get(`/files/${fileid}`);
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async uploadFile(formData) {
    try {
      const response = await this.api.post('/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.api.delete(`/files/${fileId}/delete`);
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async downloadFile(fileId) {
    try {
      const response = await this.api.get(`/files/${fileId}/download`, {
        responseType: 'blob',
      });
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async commentFile(fileId, newComment) {
    try {
      const response = await this.api.patch(`/files/${fileId}/comment`, newComment);
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async renameFile(fileId, newName) {
    try {
      const response = await this.api.patch(`/files/${fileId}/rename`, newName);
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async getUsers() {
    try {
      const response = await this.api.get('/admin/users/');
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async createUser() {
    try {
      const response = await this.api.post('/admin/create-user/');
      return response.data
    } catch (e) {
      console.error(e)
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
      return response.data
    } catch (e) {
      console.error(e)
    }
  }
}

export default new Api();
