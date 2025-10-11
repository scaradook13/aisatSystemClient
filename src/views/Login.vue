<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
      <div class="flex justify-center mb-4">
        <div class="bg-blue-100 p-4 rounded-full">
          <User class="w-8 h-8  text-blue-600" />
        </div>
      </div>

      <h2 class="text-2xl font-bold text-center mb-2">Login Portal</h2>
      <p class="text-gray-500 text-center mb-6">
        Enter your credentials to access your account
      </p>

      <form @submit.prevent="handleLogin">
        <!-- Student Number -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Student Number</label>
          <input
            v-model="studentNumber"
            type="text"
            placeholder="e.g., 202512345"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Remember me and Forgot password -->
        <div class="flex justify-end items-center mb-6 text-sm">
          <!-- <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="rememberMe" class="form-checkbox">
            <span>Remember me</span>
          </label> -->
          <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
        </div>

        <!-- Sign In Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Sign In
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        Don’t have an account?
        <a href="#" class="text-blue-600 hover:underline">Contact Administrator</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/User'
import { User } from 'lucide-vue-next'
import router from '@/router'
const userStore = useUserStore()

const studentNumber = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
  if(studentNumber.value === 'admin' && password.value === 'admin') {
    userStore.user = 'admin'
    console.log(userStore.user)
    router.push('/adminDashboard')
}
  if(studentNumber.value === '2025123' && password.value === '2025123'){
    userStore.user = 'Student'
    userStore.section = 'GC1MA'
    console.log(userStore.user, userStore.section)
    router.push('/form')
  }
}
</script>
