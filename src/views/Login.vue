<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl w-full max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl"
    >
      <!-- Header -->
      <div class="flex flex-col items-center mb-6 sm:mb-8">
        <div class="bg-blue-600/10 p-3 sm:p-4 rounded-3xl mb-4 flex items-center justify-center">
          <img src="../assets/aisatLogo.jpg" alt="" class="w-24 h-24 rounded-full object-cover">
        </div>
        <h1
          class="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center"
        >
          Login Portal
        </h1>
        <p class="text-gray-500 text-sm sm:text-base text-center mt-1">
          Access your student or admin account
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5 sm:space-y-6">
        <!-- Email -->
        <div class="relative">
          <input
            v-model="email"
            type="text"
            id="email"
            placeholder=" "
            class="peer w-full border border-gray-300 rounded-xl px-3 pt-6.5 pb-2 text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <label
            for="email"
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all 
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                   peer-placeholder-shown:text-gray-400 peer-focus:top-2 
                   peer-focus:text-sm peer-focus:text-blue-600"
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
            class="absolute left-3 top-2 text-gray-500 text-sm transition-all 
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
                   peer-placeholder-shown:text-gray-400 peer-focus:top-2 
                   peer-focus:text-sm peer-focus:text-blue-600"
          >
            Password
          </label>
          <p v-if="passwordError" class="text-red-500 text-xs mt-1">
            {{ passwordError }}
          </p>
        </div>

        <!-- Forgot Password -->
        <div class="flex justify-end">
          <a
            href="#"
            class="text-blue-600 text-sm sm:text-base font-medium hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <!-- Sign In Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all 
                 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8">
        Don’t have an account?
        <RouterLink
          to="/register"
          class="text-blue-600 font-medium hover:underline"
        >
          Register Here
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { User } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const { email, password, emailError, passwordError } = storeToRefs(authStore)

const handleLogin = () => {
  authStore.login()
}
</script>
