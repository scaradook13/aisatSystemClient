<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl w-full max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8"
    >
      <!-- Header -->
      <div class="flex flex-col items-center mb-8">
        <div class="bg-blue-600/10 p-3 sm:p-4 rounded-3xl mb-4 flex items-center justify-center">
          <img src="../assets/aisatLogo.jpg" alt="" class="w-24 h-24 rounded-full object-cover">
        </div>
        <h1 class="text-3xl font-semibold text-gray-900 text-center">
          Create Account
        </h1>
        <p class="text-gray-500 text-sm text-center mt-1">
          Register to access your student dashboard
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-6">

        <!-- Student Number -->
        <div class="relative">
          <input
            id="studentNumber"
            v-model="studentNumber"
            type="number"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6 pb-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label
            for="studentNumber"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Student Number
          </label>
        </div>

        <!-- First Name -->
        <div class="relative">
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6 pb-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label
            for="firstName"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            First Name
          </label>
        </div>

        <!-- Last Name -->
        <div class="relative">
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6 pb-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label
            for="lastName"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Last Name
          </label>
        </div>

        <!-- Middle Name -->
        <div class="relative">
          <input
            id="middleName"
            v-model="middleName"
            type="text"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6 pb-2 focus:ring-2 focus:ring-blue-500"
          />
          <label
            for="middleName"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Middle Name
          </label>
        </div>

        <!-- Email -->
        <div class="relative">
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6 pb-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label
            for="email"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Email Address
          </label>
        </div>

        <!-- Password -->
        <div class="relative">
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6 pb-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label
            for="password"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Password
          </label>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6 pb-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label
            for="confirmPassword"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Confirm Password
          </label>
        </div>

        <!-- Register Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg"
        >
          Create Account
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-500 mt-6">
        Already have an account?
        <RouterLink to="/login" class="text-blue-600 font-medium hover:underline">
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
  firstName,
  lastName,
  middleName,
  email,
  password,
  confirmPassword
} = storeToRefs(authStore)

const handleRegister = () => {
  authStore.registerUser()
}
</script>


