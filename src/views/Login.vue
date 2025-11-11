<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl w-full max-w-md md:max-w-lg lg:max-w-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl"
    >
      <!-- Header -->
      <div class="flex flex-col items-center mb-6 sm:mb-8">
        <div class="bg-blue-600/10 p-3 sm:p-4 rounded-3xl mb-4 flex items-center justify-center">
          <img src="../assets/aisatLogo.jpg" alt="" class="w-24 h-24 rounded-full object-cover">
        </div>
        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center">
          Login Portal
        </h1>
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
          <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
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
          <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
        </div>

        <!-- Forgot Password -->
        <div class="flex justify-end">
          <RouterLink
            to="/forgotPassword"
            class="text-blue-600 font-medium hover:underline"
          >
            Forgot password?
          </RouterLink>
        </div>

        <!-- Sign In Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all 
                 shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <template v-if="!isLoading">
            Sign In
          </template>
          <template v-else>
            <svg
              class="animate-spin inline-block mr-2 w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 11-8 8z"
              ></path>
            </svg>
            Signing in...
          </template>
        </button>
      </form>

      <!-- Google Login -->
      <button
        type="button"
        :disabled="isLoading"
        @click="authStore.loginWithGoogle"
        class="w-full flex items-center justify-center gap-2 mt-3 border border-gray-300 py-2.5 rounded-xl hover:bg-gray-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
        <span class="text-gray-700 font-medium">Sign in with Google</span>
      </button>

      <!-- Footer -->
      <p class="text-center text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8">
        Don’t have an account?
        <RouterLink to="/register" class="text-blue-600 font-medium hover:underline">
          Register Here
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const { email, password, emailError, passwordError } = storeToRefs(authStore)

const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    await authStore.login()
  } finally {
    // Re-enable after login completes (success or error)
    isLoading.value = false
  }
}
</script>
