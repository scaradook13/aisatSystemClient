import { ref } from 'vue'
import { defineStore } from 'pinia'
import AdminService from '@/api/AdminService'
import { useToast } from "vue-toastification"

const toast = useToast()

export const useAdminStore = defineStore('Admin', () => {
  const teachers = ref([])
  const sections = ref([])
  const students = ref([])
  const activeForm = ref([])
  const enrolledStudent = ref([])

  // --- Helper for consistent error handling ---
  const handleError = (err, fallbackMessage) => {
    console.error(err)
    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      fallbackMessage
    toast.error(errorMessage)
  }

  // ===================== TEACHERS =====================
  const addTeacher = async (payload) => {
    try {
      const response = await AdminService.addTeacher(payload)
      if (response.success) {
        toast.success(response.message || "Teacher added successfully!")
        await fetchTeachers()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "An unexpected error occurred while adding the teacher.")
    }
  }

  const updateTeacher = async (id, payload) => {
    try {
      const response = await AdminService.updateTeacher(id, payload)
      if (response.success) {
        toast.success(response.message || "Teacher updated successfully!")
        await fetchTeachers()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to update teacher.")
    }
  }

  const deleteTeacher = async (id) => {
    try {
      const response = await AdminService.deleteTeacher(id)
      if (response.success) {
        toast.success(response.message || "Teacher deleted successfully!")
        await fetchTeachers()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to delete teacher.")
    }
  }

  const fetchTeachers = async () => {
    try {
      const response = await AdminService.getTeachers()
      teachers.value = response.data || []
    } catch (err) {
      handleError(err, "Failed to fetch teachers.")
    }
  }

  // ===================== SECTIONS =====================
  const addSection = async (payload) => {
    try {
      const response = await AdminService.addSection(payload)
      if (response.success) {
        toast.success(response.message || "Section added successfully!")
        await fetchSections()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "An unexpected error occurred while adding the section.")
    }
  }

  const updateSection = async (id, payload) => {
    try {
      const response = await AdminService.updateSection(id, payload)
      if (response.success) {
        toast.success(response.message || "Section updated successfully!")
        await fetchSections()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to update section.")
    }
  }

  const deleteSection = async (id) => {
    try {
      const response = await AdminService.deleteSection(id)
      if (response.success) {
        toast.success(response.message || "Section deleted successfully!")
        await fetchSections()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to delete section.")
    }
  }

  const fetchSections = async () => {
    try {
      const response = await AdminService.getSections()
      sections.value = response.data || []
    } catch (err) {
      handleError(err, "Failed to fetch sections.")
    }
  }

  // ===================== STUDENTS =====================
  const fetchStudents = async () => {
    try {
      const response = await AdminService.getStudents()
      students.value = response.data || []
    } catch (err) {
      handleError(err, "Failed to fetch students.")
    }
  }

  const updateStudent = async (id, payload) => {
    try {
      const response = await AdminService.updateStudent(id, payload)
      if (response.success) {
        toast.success(response.message || "Student updated successfully!")
        await fetchStudents()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to update student.")
    }
  }

  const deleteStudent = async (id) => {
    try {
      const response = await AdminService.deleteStudent(id)
      if (response.success) {
        toast.success(response.message || "Student deleted successfully!")
        await fetchStudents()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to delete student.")
    }
  }

  // ===================== FORMS =====================
  const fetchActiveForm = async () => {
    try {
      const response = await AdminService.getForms()
      activeForm.value = response.data || []
    } catch (err) {
      handleError(err, "Failed to fetch form.")
    }
  }

  const addForm = async (payload) => {
    try {
      const response = await AdminService.addForm(payload)
      if (response.success) {
        toast.success(response.message || "Form added successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to add form.")
    }
  }

  const updateForm = async (id, payload) => {
    try {
      const response = await AdminService.updateForm(id, payload)
      if (response.success) {
        toast.success(response.message || "Form updated successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to update form.")
    }
  }

  const deleteForm = async (id) => {
    try {
      const response = await AdminService.deleteForm(id)
      if (response.success) {
        toast.success(response.message || "Form deleted successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to delete form.")
    }
  }

  // ===================== CATEGORIES =====================
  const addCategory = async (payload) => {
    try {
      const response = await AdminService.addCategory(payload)
      if (response.success) {
        toast.success(response.message || "Category added successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to add category.")
    }
  }

  const updateCategory = async (id, payload) => {
    try {
      const response = await AdminService.updateCategory(id, payload)
      if (response.success) {
        toast.success(response.message || "Category updated successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to update category.")
    }
  }

  const deleteCategory = async (id) => {
    try {
      const response = await AdminService.deleteCategory(id)
      if (response.success) {
        toast.success(response.message || "Category deleted successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to delete category.")
    }
  }

  // ===================== QUESTIONS =====================
  const addQuestion = async (payload) => {
    try {
      const response = await AdminService.addQuestion(payload)
      if (response.success) {
        toast.success(response.message || "Question added successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to add question.")
    }
  }

  const updateQuestion = async (id, payload) => {
    try {
      const response = await AdminService.updateQuestion(id, payload)
      if (response.success) {
        toast.success(response.message || "Question updated successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to update question.")
    }
  }

  const deleteQuestion = async (id) => {
    try {
      const response = await AdminService.deleteQuestion(id)
      if (response.success) {
        toast.success(response.message || "Question deleted successfully!")
        await fetchActiveForm()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err, "Failed to delete question.")
    }
  }

    const addEnrolledStudent = async (payload) => {
    try {
      const response = await AdminService.addEnrolledStudent(payload)
      if (response.success) {
        toast.success(response.message || "New enrolled student added successfully!")
        await fetchEnrolledStudents()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err)
    }
  }

    const fetchEnrolledStudents = async () => {
    try {
        const response = await AdminService.getAllEnrolledStudents();

        if (response.success) {
        enrolledStudent.value = response.data;
        } else {
        toast.error(response.message || "Failed to fetch enrolled students.");
        }
    } catch (err) {
        handleError(err, "Failed to fetch enrolled students.");
    }
    };

    const addEnrolledStudentExcel = async (payload) => {
    try {
      const response = await AdminService.addEnrolledStudentExcel(payload)
      if (response.success) {
        toast.success(response.message)
        await fetchEnrolledStudents()
      } else toast.error(response.message)
    } catch (err) {
      handleError(err)
    }
  }

  return {
    teachers,
    sections,
    students,
    activeForm,
    // Teachers
    addTeacher,
    updateTeacher,
    deleteTeacher,
    fetchTeachers,
    // Sections
    addSection,
    updateSection,
    deleteSection,
    fetchSections,
    // Students
    fetchStudents,
    updateStudent,
    deleteStudent,
    // Forms
    fetchActiveForm,
    addForm,
    updateForm,
    deleteForm,
    // Categories
    addCategory,
    updateCategory,
    deleteCategory,
    // Questions
    addQuestion,
    updateQuestion,
    deleteQuestion,

    addEnrolledStudent,
    enrolledStudent,
    fetchEnrolledStudents,
    addEnrolledStudentExcel
  }
})
