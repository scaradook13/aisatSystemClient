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
          <MailCheck class="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight text-center">
          Verify Your Account
        </h1>
        <p class="text-gray-500 text-sm sm:text-base text-center mt-1">
          We sent a 6-digit code to your email. Please enter it below to verify.
        </p>
      </div>

      <!-- OTP Input -->
      <form @submit.prevent="handleVerify" class="space-y-6 sm:space-y-8">
        <div class="flex justify-between gap-2 sm:gap-3">
          <input
            v-for="(digit, index) in otp"
            :key="index"
            type="text"
            maxlength="1"
            v-model="otp[index]"
            @input="moveFocus(index, $event)"
            class="w-10 sm:w-12 h-12 sm:h-14 text-center border border-gray-300 rounded-lg text-xl sm:text-2xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>

        <!-- Verify Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Verify Account
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center mt-6 sm:mt-8">
        <p class="text-gray-500 text-sm">
          Didn’t receive the code?
          <button
            type="button"
            @click="resendOTP"
            :disabled="isResending || countdown > 0"
            class="text-blue-600 font-medium hover:underline disabled:opacity-50"
          >
            <template v-if="countdown > 0">
              Resend in {{ countdownDisplay }}
            </template>
            <template v-else>
              Resend OTP
            </template>
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted, computed } from 'vue'
import { MailCheck } from 'lucide-vue-next'
import { storeToRefs } from "pinia"
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const { otp } = storeToRefs(authStore)

const isResending = ref(false)
const countdown = ref(0)
let timer = null

// Format countdown to MM:SS
const countdownDisplay = computed(() => {
  const m = Math.floor(countdown.value / 60)
  const s = countdown.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})

// Move focus to next input
const moveFocus = async (index, event) => {
  const value = event.target.value
  if (value && index < otp.value.length - 1) {
    const next = event.target.parentNode.children[index + 1]
    await nextTick()
    next.focus()
  }
}

// Verify account
const handleVerify = () => {
  authStore.verifyAccount()
}

// Start cooldown timer
const startCooldown = (seconds = 180) => {
  countdown.value = seconds
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

// Resend OTP
const resendOTP = async () => {
  if (countdown.value > 0) return // prevent spam clicks

  isResending.value = true
  try {
    await authStore.resendVerification()
    startCooldown(180) // 3 minutes
  } catch (err) {
    console.error(err)
    alert('Something went wrong. Please try again.')
  } finally {
    isResending.value = false
  }
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
