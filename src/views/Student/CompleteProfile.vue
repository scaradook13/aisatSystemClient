<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl w-full max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl"
    >
      <!-- Header -->
      <div class="flex flex-col items-center mb-6 sm:mb-8">
        <div class="bg-blue-600/10 p-3 sm:p-4 rounded-2xl mb-4">
          <User class="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center"
        >
          Complete Your Profile
        </h1>
        <p class="text-gray-500 text-sm sm:text-base text-center mt-1">
          Please fill in your full name and section to finish setting up your account.
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleCompleteProfile" class="space-y-5 sm:space-y-6">

        <!-- Full Name -->
        <div class="relative">
          <input
            v-model="fullName"
            type="text"
            id="fullName"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-5 pb-2 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <label
            for="fullName"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all 
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                   peer-placeholder-shown:text-gray-400 peer-focus:top-2 
                   peer-focus:text-sm peer-focus:text-blue-600"
          >
            Full Name
          </label>
          <p v-if="fullNameError" class="text-red-500 text-xs mt-1">
            {{ fullNameError }}
          </p>
        </div>

        <!-- Section -->
        <div class="relative">
          <input
            v-model="section"
            type="text"
            id="section"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-5 pb-2 
                   text-gray-900 text-sm sm:text-base focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <label
            for="section"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all 
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                   peer-placeholder-shown:text-gray-400 peer-focus:top-2 
                   peer-focus:text-sm peer-focus:text-blue-600"
          >
            Section
          </label>
          <p v-if="sectionError" class="text-red-500 text-xs mt-1">
            {{ sectionError }}
          </p>
        </div>

        <!-- Save Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all 
                 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Save Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { User } from 'lucide-vue-next'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const { fullName, section, fullNameError, sectionError } = storeToRefs(authStore)

const handleCompleteProfile = () => {
  authStore.completeProfile()
}
</script>
