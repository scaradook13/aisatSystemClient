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

  const addTeacher = async (payload) => {
    try {
      const response = await AdminService.addTeacher(payload)
      if (response.content.success) {
        toast.success("Teacher added successfully!")
        await fetchTeachers() // refresh list
      } else {
        toast.error(response.content.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to add teacher.")
    }
  }

  const addSection = async (payload) => {
    try {
      const response = await AdminService.addSection(payload)
      if (response.content.success) {
        toast.success("Section added successfully!")
        await fetchSections()
      } else {
        toast.error(response.content.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to add section.")
    }
  }

  const updateTeacher = async (id, payload) => {
    try {
      const response = await AdminService.updateTeacher(id, payload)
      if (response.content.success) {
        toast.success("Teacher updated successfully!")
        await fetchTeachers()
      } else {
        toast.error(response.content.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update teacher.")
    }
  }

  const updateSection = async (id, payload) => {
    try {
      const response = await AdminService.updateSection(id, payload)
      if (response.content.success) {
        toast.success("Section updated successfully!")
        await fetchSections()
      } else {
        toast.error(response.content.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update section.")
    }
  }

  const deleteTeacher = async (id) => {
    try {
      const response = await AdminService.deleteTeacher(id)
      if (response.content.success) {
        toast.success("Teacher deleted successfully!")
        await fetchTeachers()
      } else {
        toast.error(response.content.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete teacher.")
    }
  }

  const deleteSection = async (id) => {
    try {
      const response = await AdminService.deleteSection(id)
      if (response.content.success) {
        toast.success("Section deleted successfully!")
        await fetchSections()
      } else {
        toast.error(response.content.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete section.")
    }
  }

  const fetchTeachers = async () => {
    try {
      const response = await AdminService.getTeachers()
      teachers.value = response.content?.data || []
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch teachers.")
    }
  }

  const fetchSections = async () => {
    try {
      const response = await AdminService.getSections()
      sections.value = response.content?.data || []
      console.log('Fetched sections:', sections.value)
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch sections.")
    }
  }

  const fetchStudents = async () => {
  try {
    const response = await AdminService.getStudents()
    students.value = response.content?.data || []
    console.log('Fetched students:', students.value)
  } catch (err) {
    console.error(err)
    toast.error("Failed to fetch students.")
  }
}

const updateStudent = async (id, payload) => {
    try {
      const response = await AdminService.updateStudent(id, payload)
      if (response.content.success) {
        toast.success("Student updated successfully!")
        await fetchStudents()
      } else {
        toast.error(response.content.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update student.")
    }
  }

  const deleteStudent = async (id) => {
    try {
      const response = await AdminService.deleteStudent(id)
      if (response.content.success) {
        toast.success("Student deleted successfully!")
        await fetchStudents()
      } else {
        toast.error(response.content.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete student.")
    }
  }
  
  const fetchActiveForm = async () => {
  try {
    const response = await AdminService.getForms()
    activeForm.value = response.content?.data || []
  } catch (err) {
    console.error(err)
    // toast.error("Failed to fetch Form.")
  }
}

const addForm = async (payload) => {
    try {
      const response = await AdminService.addForm(payload)
      if (response.content.success) {
        toast.success("Form added successfully!")
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to add form.")
    }
  }

  const updateForm = async (id, payload) => {
    try {
      const response = await AdminService.updateForm(id, payload)
      if (response.content.success) {
        toast.success("Form updated successfully!")
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update form.")
    }
  }

  const deleteForm = async (id) => {
    try {
      const response = await AdminService.deleteForm(id)
      if (response.content.success) {
        toast.success("Form deleted successfully!")
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete form.")
    }
  }

  // ===================== CATEGORIES =====================
  const addCategory = async (payload) => {
    try {
      const response = await AdminService.addCategory(payload)
      if (response.content.success) {
        toast.success("Category added successfully!")
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to add category.")
    }
  }

  const updateCategory = async (id, payload) => {
    try {
      const response = await AdminService.updateCategory(id, payload)
      if (response.content.success) {
        toast.success("Category updated successfully!")
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update category.")
    }
  }

  const deleteCategory = async (id) => {
    try {
      const response = await AdminService.deleteCategory(id)
      if (response.content.success) {
        toast.success("Category deleted successfully!")
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete category.")
    }
  }

  // ===================== QUESTIONS =====================
  const addQuestion = async (payload) => {
    try {
      const response = await AdminService.addQuestion(payload)
      if (response.content.success) {
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to add question.")
    }
  }

  const updateQuestion = async (id, payload) => {
    try {
      const response = await AdminService.updateQuestion(id, payload)
      if (response.content.success) {
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update question.")
    }
  }

  const deleteQuestion = async (id) => {
    try {
      const response = await AdminService.deleteQuestion(id)
      if (response.content.success) {
        toast.success("Question deleted successfully!")
        await fetchActiveForm()
      } else toast.error(response.content.message)
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete question.")
    }
  }




  return {
    teachers,
    sections,
    students,
    activeForm,
    addTeacher,
    addSection,
    updateTeacher,
    updateSection,
    deleteTeacher,
    deleteSection,
    fetchTeachers,
    fetchSections,
    fetchStudents,
    updateStudent,
    deleteStudent,
    fetchActiveForm,
    addForm,
    updateForm,
    deleteForm,
    addCategory,
    updateCategory,
    deleteCategory,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  }
})
