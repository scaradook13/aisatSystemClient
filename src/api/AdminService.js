import BaseService from './baseService';

class AdminService extends BaseService {
  constructor() {
    super();
  }

  // ===================== TEACHERS =====================
  async addTeacher(payload) {
    const response = await this.api.post("/addTeacher", payload);
    return response.data;
  }

  async getTeachers() {
    const response = await this.api.get("/getTeachers");
    return response.data;
  }

  async updateTeacher(id, payload) {
    const response = await this.api.patch(`/updateTeacher/${id}`, payload);
    return response.data;
  }

  async deleteTeacher(id) {
    const response = await this.api.delete(`/deleteTeacher/${id}`);
    return response.data;
  }

  // ===================== SECTIONS =====================
  async addSection(payload) {
    const response = await this.api.post("/addSection", payload);
    return response.data;
  }

  async getSections() {
    const response = await this.api.get("/getSections");
    return response.data;
  }

  async updateSection(id, payload) {
    const response = await this.api.patch(`/updateSection/${id}`, payload);
    return response.data;
  }

  async deleteSection(id) {
    const response = await this.api.delete(`/deleteSection/${id}`);
    return response.data;
  }

  // ===================== STUDENTS =====================
  async getStudents() {
    const response = await this.api.get("/getStudents");
    return response.data;
  }

  async updateStudent(id, payload) {
    const response = await this.api.patch(`/updateStudent/${id}`, payload);
    return response.data;
  }

  async deleteStudent(id) {
    const response = await this.api.delete(`/deleteStudent/${id}`);
    return response.data;
  }

  // ===================== FORMS =====================
  async addForm(payload) {
    const response = await this.api.post("/addForm", payload);
    return response.data;
  }

  async getForms() {
    const response = await this.api.get("/getForms");
    return response.data;
  }

  async updateForm(id, payload) {
    const response = await this.api.patch(`/updateForm/${id}`, payload);
    return response.data;
  }

  async deleteForm(id) {
    const response = await this.api.delete(`/deleteForm/${id}`);
    return response.data;
  }

  // ===================== CATEGORIES =====================
  async addCategory(payload) {
    const response = await this.api.post("/addCategory", payload);
    return response.data;
  }

  async getCategories() {
    const response = await this.api.get("/getCategories");
    return response.data;
  }

  async updateCategory(id, payload) {
    const response = await this.api.patch(`/updateCategory/${id}`, payload);
    return response.data;
  }

  async deleteCategory(id) {
    const response = await this.api.delete(`/deleteCategory/${id}`);
    return response.data;
  }

  // ===================== QUESTIONS =====================
  async addQuestion(payload) {
    const response = await this.api.post("/addQuestion", payload);
    return response.data;
  }

  async getQuestions() {
    const response = await this.api.get("/getQuestions");
    return response.data;
  }

  async updateQuestion(id, payload) {
    const response = await this.api.patch(`/updateQuestion/${id}`, payload);
    return response.data;
  }

  async deleteQuestion(id) {
    const response = await this.api.delete(`/deleteQuestion/${id}`);
    return response.data;
  }

  async addEnrolledStudent(payload) {
    const response = await this.api.post("/addEnrolledStudent", payload);
    return response.data;
  }

  async getAllEnrolledStudents() {
    const response = await this.api.get("/getAllEnrolledStudents");
    return response.data;
  }

  async addEnrolledStudentExcel(payload) {
    const response = await this.api.post("/addEnrolledStudentExcel", payload);
    return response.data;
  }  

  async getAllActiveEvaluations() {
    const response = await this.api.get("/getAllActiveEvaluations");
    return response.data;
  }

  async updateEnrolledStudent(id, payload) {
    const response = await this.api.patch(`/updateEnrolledStudent/${id}`, payload);
    return response.data;
  }

  async deleteEnrolledStudent(id) {
    const response = await this.api.delete(`/deleteEnrolledStudent/${id}`);
    return response.data;
  }

  async addFormCopy(payload) {
    const response = await this.api.post("/addFormCopy", payload);
    return response.data;
  }

  async addAdmin(payload) {
    const response = await this.api.post("/createAdmin", payload);
    return response.data;
  }

  async getAdmin(id = null) {
    const response = await this.api.get("/getAllAdmin");
    return response.data;
  }

  async updateAdmin(id, payload) {
    const response = await this.api.patch(`/updateAdmin/${id}`, payload);
    return response.data;
  }

  async deleteAdmin(id) {
    const response = await this.api.delete(`/deleteAdmin/${id}`);
    return response.data;
  }

}

export default new AdminService();
