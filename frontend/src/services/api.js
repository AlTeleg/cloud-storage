import axios from 'axios';
import HOST from './config';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: HOST,
      withCredentials: true,
      xsrfCookieName:'csrftoken',
      xsrfHeaderName:'X-CSRFTOKEN'
    });
  }

  async loginUser(userData) {
    try {
      const response = await this.api.post('login/', userData);
      return response;
    } catch (error) {
      console.error(error)
    }
  }


  async logoutUser() {
    try {
      const response = await this.api.post('logout/');
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async registerUser(userData) {
    try {
      const response = await this.api.post('register/', userData);
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async deleteUser(userId) {
    try {
      const response = await this.api.delete(`admin/users/${userId}/`);
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async getFiles() {
    try {
      const response = await this.api.get('files/get/');
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async getFile(fileid) {
    try {
      const response = await this.api.get(`files/${fileid}/get/`);
      return response;
    } catch (error) {
      console.error(error)
    }
  }


  async uploadFile(formData) {
    try {
      const response = await this.api.post('files/upload/', formData);
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.api.delete(`files/${fileId}/delete/`);
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async downloadFile(fileId) {
    try {
      const response = await this.api.get(`files/${fileId}/download/`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async commentFile(fileId, newComment) {
    try {
      const response = await this.api.patch(`files/${fileId}/comment/`, newComment);
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async renameFile(fileId, newName) {
    try {
      const response = await this.api.patch(`files/${fileId}/rename/`, newName);
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async getUsers() {
    try {
      const response = await this.api.get('admin/users/get/');
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async createUser(userData) {
    try {
      const response = await this.api.post('admin/create-user/', userData);
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  async getAllFiles(sort = 'upload_date', filter = null, filterValue = null) {
    try {
      const response = await this.api.get('admin/files/get/', {
        params: {
          sort: sort,
          filter: filter,
          filter_value: filterValue
        }
      });
      return response;
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Api();
