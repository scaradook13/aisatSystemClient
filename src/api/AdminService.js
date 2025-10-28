import BaseService from './baseService';

class AdminService extends BaseService {
  constructor() {
    super();
  }

  async addTeacher(payload) {
    try {
      const response = await this.api.post("/addTeacher", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTeachers() {
    try {
      const response = await this.api.get("/getTeachers");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateTeacher(id, payload) {
    try {
      const response = await this.api.patch(`/updateTeacher/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteTeacher(id) {
    try {
      const response = await this.api.delete(`/deleteTeacher/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addSection(payload) {
    try {
      const response = await this.api.post("/addSection", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSections() {
    try {
      const response = await this.api.get("/getSections");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateSection(id, payload) {
    try {
      const response = await this.api.patch(`/updateSection/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteSection(id) {
    try {
      const response = await this.api.delete(`/deleteSection/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getStudents() {
    try {
      const response = await this.api.get("/getStudents");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id, payload) {
    try {
      const response = await this.api.patch(`/updateStudent/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id) {
    try {
      const response = await this.api.delete(`/deleteStudent/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AdminService();
