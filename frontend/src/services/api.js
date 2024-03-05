import axios from 'axios';
import HOST from './config';

class Api {
  constructor() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    this.api = axios.create({
      baseURL: HOST,
      withCredentials: true,
    });
  }

  getCsrfToken() {
    if (document.cookie && document.cookie !== '') {
      return document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('csrftoken='))
      .split('=')[1];
    } else {
      console.log('document.cookie nor found or empty')
    }
    }


  async loginUser(userData) {
    try {
      const csrfToken = this.getCsrfToken();
      const response = await this.api.post('login/', userData, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }


  async logoutUser() {
    try {
      const response = await this.api.post('logout/');
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async registerUser(userData) {
    try {
      const csrfToken = this.getCsrfToken();
      const response = await this.api.post('register/', userData, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.api.delete(`admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async getFiles() {
    try {
      const response = await this.api.get('files/');
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async getFile(fileid) {
    try {
      const response = await this.api.get(`files/${fileid}`);
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async uploadFile(formData) {
    try {
      const csrfToken = this.getCsrfToken();
      const response = await this.api.post('files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.api.delete(`files/${fileId}/delete`);
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async downloadFile(fileId) {
    try {
      const response = await this.api.get(`files/${fileId}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async commentFile(fileId, newComment) {
    try {
      const response = await this.api.patch(`files/${fileId}/comment`, newComment);
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async renameFile(fileId, newName) {
    try {
      const response = await this.api.patch(`files/${fileId}/rename`, newName);
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async getUsers() {
    try {
      const response = await this.api.get('admin/users/');
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async createUser(userData) {
    try {
      const csrfToken = this.getCsrfToken();
      const response = await this.api.post('admin/create-user/', userData , {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async getAllFiles(sort = 'upload_date', filter = null) {
    try {
      const response = await this.api.get('admin/files/', {
        params: {
          sort: sort,
          filter: filter
        }
      });
      return response.data;
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Api();
