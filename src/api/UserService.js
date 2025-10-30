import BaseService from './baseService';

class UserService extends BaseService {
  constructor() {
    super();
  }

  async addEvaluation(payload) {
    const response = await this.api.post("/addEvaluation", payload);
    return response.data;
  }

  async getStudentInfo(id,payload) {
    const response = await this.api.get(`/getStudentInfo`, payload);
    return response.data;
  }

}

export default new UserService();
