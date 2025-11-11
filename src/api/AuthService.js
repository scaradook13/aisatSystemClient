import BaseService from './baseService';

class AuthService extends BaseService {
  constructor() {
    super();
  }
  
  async register(payload) {
    try {
      const response = await this.api.post("/createUser", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyAccount(payload) {
    try {
      const response = await this.api.post("/verifyUser", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(payload) {
    try {
      const response = await this.api.post("/login", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      const response = await this.api.get("/auth/user");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const response = await this.api.get("/auth/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resendVerification(payload) {
    try {
      const response = await this.api.post("/resendVerification", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async requestForgotPassword(payload) {
    try {
      const response = await this.api.post("/requestForgotPassword", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyForgotPassword(payload) {
    try {
      const response = await this.api.post("/verifyForgotPassword", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async ping() {
    try {
      const response = await this.api.get("/ping");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle(payload) {
    try {
      const response = await this.api.post("/google", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default new AuthService();