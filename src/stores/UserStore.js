import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import UserService from '@/api/UserService'
import { useAuthStore } from './AuthStore'


export const useUserStore = defineStore('User', () => {
  const authStore = useAuthStore()
  const studentId = ref(authStore.id)
  const { section } = storeToRefs(authStore);
  const selectedTeacher = ref('')
  const ratings = ref({})
  const comment = ref()

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

  return { 
    setRating,
    addEvaluation,
    selectedTeacher,
    section,
    ratings,
    comment
   }
})
