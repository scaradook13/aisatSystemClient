import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import UserService from '@/api/UserService'


export const useUserStore = defineStore('User', () => {
  const studentId = ref('')
  const section = ref('')
  const selectedTeacher = ref('')
  const ratings = ref({})
  const comment = ref()
  const teacherEvaluated = ref([])

  const setRating = (questionId, rating) => {
    ratings.value[questionId] = rating;
    console.log(ratings.value)
  };

  const addEvaluation = async () => {
    const payload = ({
      studentId: studentId.value,
      teacher: selectedTeacher.value,
      section: section.value,
      answers: ratings.value,
      comment: comment.value
    })
      try {
        console.log(payload)
        const response = await UserService.addEvaluation(payload)

      } catch (err) {
        console.error(err)
        toast.error("Failed to submit Evaluation.")
      }
    }

    const fetchStudentInfo = async () => {
      try {
        const response = await UserService.getStudentInfo()
        console.log("Full student info response:", response)

        const userData = response.data // 👈 correct level

        studentId.value = userData._id
        section.value = userData.profile.section
        teacherEvaluated.value = userData.profile.teacherEvaluated || []

        console.log("Fetched teacherEvaluated:", teacherEvaluated.value)
      } catch (err) {
        console.error(err)
        toast.error("Failed to get student data.")
      }
    }

  return { 
    setRating,
    addEvaluation,
    fetchStudentInfo,
    selectedTeacher,
    section,
    ratings,
    comment,
    teacherEvaluated
   }
})
