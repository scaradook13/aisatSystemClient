import { ref } from 'vue'
import { defineStore } from 'pinia'
import AdminService from '@/api/AdminService'
import { useToast } from "vue-toastification"

const toast = useToast()

export const useAdminStore = defineStore('Admin', () => {

  const teachers = ref([])
  const sections = ref([])
  const students = ref([])

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
      console.log('Fetched teachers:', teachers.value)
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


  return {
    teachers,
    sections,
    students,
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
  }
})
