<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl rounded-3xl w-full max-w-md md:max-w-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl"
    >
      <!-- Header -->
      <div class="flex flex-col items-center mb-6 sm:mb-8">
        <div class="bg-blue-600/10 p-3 sm:p-4 rounded-3xl mb-4 flex items-center justify-center">
          <img src="../assets/aisatLogo.jpg" alt="Logo" class="w-20 h-20 rounded-full object-cover" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center">
          Reset Your Password
        </h1>
        <p class="text-gray-500 text-sm sm:text-base text-center mt-1">
          Enter your registered email and verification code to reset your password.
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleResetPassword" class="space-y-5 sm:space-y-6">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your Gmail"
            class="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Send Code Button -->
        <div class="flex justify-end">
          <button
            type="button"
            @click="sendVerificationCode"
            :disabled="isSending || countdown > 0"
            class="text-blue-600 text-sm font-medium hover:underline disabled:opacity-50"
          >
            <template v-if="countdown > 0">
              Resend in {{ countdownDisplay }}
            </template>
            <template v-else>
              {{ isSending ? 'Sending...' : 'Send Code' }}
            </template>
          </button>
        </div>

        <!-- Verification Code -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
          <input
            v-model="verificationCode"
            type="text"
            maxlength="6"
            placeholder="Enter 6-digit code"
            class="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- New Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            v-model="newPassword"
            type="password"
            placeholder="Enter new password"
            class="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            class="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Reset Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Reset Password
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8">
        Remember your password?
        <RouterLink to="/login" class="text-blue-600 font-medium hover:underline">
          Go Back to Login
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore()
const { email, confirmPassword, newPassword, verificationCode, isSending, countdown, timer } = storeToRefs(authStore)
const toast = useToast()

const countdownDisplay = computed(() => {
  const m = Math.floor(countdown.value / 60)
  const s = countdown.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})

// Send verification code
const sendVerificationCode = async () => {
  try {
    isSending.value = true
    await authStore.requestForgotPassword()
    startCooldown(180)
  } catch (error) {
  } finally {
    isSending.value = false
  }
}



// Start 3-minute cooldown
const startCooldown = (seconds = 180) => {
  countdown.value = seconds
  timer = setInterval(() => {
    if (countdown.value > 0) countdown.value--
    else clearInterval(timer)
  }, 1000)
}

const handleResetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    toast.error("Passwords don't match.")
    return
  }

  try {
    await authStore.verifyForgotPassword()
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to reset password.')
  }
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
