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
          <UserPlus class="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center"
        >
          Create Account
        </h1>
        <p class="text-gray-500 text-sm sm:text-base text-center mt-1">
          Register to access your student dashboard
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-5 sm:space-y-6">

        <!-- Student Number -->
        <div class="relative">
          <input
            v-model="studentNumber"
            type="number"
            id="studentNumber"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6.5 pb-2 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <label
            for="studentNumber"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Student Number
          </label>
          <p v-if="studentNumberError" class="text-red-500 text-xs mt-1">
            {{ studentNumberError }}
          </p>
        </div>

        <!-- Email -->
        <div class="relative">
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6.5 pb-2 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <label
            for="email"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Email Address
          </label>
          <p v-if="emailError" class="text-red-500 text-xs mt-1">
            {{ emailError }}
          </p>
        </div>

        <!-- Password -->
        <div class="relative">
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6.5 pb-2 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <label
            for="password"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Password
          </label>
          <p v-if="passwordError" class="text-red-500 text-xs mt-1">
            {{ passwordError }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6.5 pb-2 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <label
            for="confirmPassword"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Confirm Password
          </label>
          <p v-if="confirmPasswordError" class="text-red-500 text-xs mt-1">
            {{ confirmPasswordError }}
          </p>
        </div>

        <!-- Register Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Create Account
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8">
        Already have an account?
        <RouterLink
          to="/login"
          class="text-blue-600 font-medium hover:underline"
        >
          Sign In
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { UserPlus } from 'lucide-vue-next'
import { storeToRefs } from "pinia";
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const {
  studentNumber,
  email,
  password,
  confirmPassword,
  studentNumberError,
  emailError,
  passwordError,
  confirmPasswordError,
} = storeToRefs(authStore)

const handleRegister = () => {
  authStore.registerUser()
}
</script>
