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
    const response = await this.api.post('login/', userData);
    return response;
  }
  
  async logoutUser() {
    const response = await this.api.post('logout/');
    return response;
  }

  async registerUser(userData) {
    const response = await this.api.post('register/', userData);
    return response;
    }

  async deleteUser(userId) {
    const response = await this.api.delete(`admin/users/${userId}/`);
    return response;
  }

  async getFiles() {
    const response = await this.api.get('files/get/');
    return response;
    }

  async getFile(fileId) {
    const response = await this.api.get(`files/${fileId}/get/`);
    return response;
  }

  async changeLink(fileId) {
    const response = await this.api.patch(`files/${fileId}/special/`);
    return response;
  }

  async uploadFile(formData) {
    const response = await this.api.post('files/upload/', formData);
    return response;
  }

  async deleteFile(fileId) {
    const response = await this.api.delete(`files/${fileId}/delete/`);
    return response;
  }

  async downloadFile(fileId) {
    const response = await this.api.get(`files/${fileId}/download/`, {
      responseType: 'blob',
    });
    return response;
  }

  async commentFile(fileId, newComment) {
    const response = await this.api.patch(`files/${fileId}/comment/`, newComment);
    return response;
  }

  async renameFile(fileId, newName) {
    const response = await this.api.patch(`files/${fileId}/rename/`, newName);
    return response;
  }

  async getUsers() {
    const response = await this.api.get('admin/users/get/');
    return response;
  }

  async createUser(userData) {
    const response = await this.api.post('admin/create-user/', userData);
    return response;
  }

  async toggleAdmin(userId) {
    const response = await this.api.patch(`admin/users/${userId}/`);
    return response;
  }

  async getAllFiles(sort = 'upload_date', filter = null, filterValue = null) {
    const response = await this.api.get('admin/files/get/', {
      params: {
        sort: sort,
        filter: filter,
        filter_value: filterValue
      }
    });
    return response;
  }
}

export default new Api();
