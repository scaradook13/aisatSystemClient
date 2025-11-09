import emailService from './emailService';

class EmailAuth extends emailService {
  constructor() {
    super();
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


}
export default new EmailAuth();