import { ref, reactive, computed } from 'vue'

import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', () => {
    const user = ref('')
    const section = ref('')
  return { 
    user,
    section
   }
})
