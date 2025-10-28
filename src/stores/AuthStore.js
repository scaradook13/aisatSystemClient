import { ref } from 'vue'
import AuthService from '@/api/AuthService.js'
import router from '@/router'
import { defineStore } from 'pinia'
import { useToast } from "vue-toastification";
const toast = useToast();

export const useAuthStore = defineStore('Auth', () => {
    const studentNumber = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const verificationEmail = ref('')
    const fullName = ref('')
    const section = ref('')
    const unverified = ref(false)
    const studentNumberError = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const confirmPasswordError = ref('')
    const otp = ref(Array(6).fill(''))
    const role = ref('')
    const isProfileComplete = ref(false)
    const isAuthenticated = ref(false)

    const registerUser = async (payload) => {
    try {
      if (studentNumber.value === '') return studentNumber.value = 'studentNumber is required.'
      if (email.value === '') return (emailError.value = "Email is required.");
      if (password.value === '') return passwordError.value = `Password can't be empty`;
      if (password.value?.length < 8) return passwordError.value = "Password atleast 8 characters";
      if (password.value !== confirmPassword.value) return confirmPasswordError.value = "Confirm password not match. Please try again"
      verificationEmail.value = email.value;

      const response = await AuthService.register({
        studentNumber: studentNumber.value,
        email: email.value,
        password: password.value,
      });
      router.push({ name: 'verification' });

    } catch (err) {
      console.log(err);
      if (err.response?.data === `This email you've used is already registered but not verified.`) {
        return unverified.value = true;
      }
      emailError.value = err.response?.data
    };

  }
  
  const verifyAccount = async () => {
    try {
      const response = await AuthService.verifyAccount({
        email: verificationEmail.value,
        otp: otp.value.join(''),
      });
      router.push({ name: 'login' });

    } catch (err) {
        console.log(err);
    };

  }

  const login = async () => {
    try {

    if (!email.value.includes('@')) {
      emailError.value = 'Please enter a valid email address.'
    }

    if (!emailError.value && !passwordError.value) {

        const response = await AuthService.login({
        email: email.value,
        password: password.value,
      });
      
      await getUser();
        router.push({ name: 'form' });
        toast.success("Login successful!" );
    }

    } catch (err) {
        console.log(err);
    };

  }

  const getUser = async () => {
    try {
      const response = await AuthService.getUser()

      email.value = response.email || ''
      role.value = response.role || ''
      isProfileComplete.value = response.isProfileComplete || false

      // Profile info (nested object)
      if (response.profile) {
        fullName.value = response.profile.fullName || ''
        section.value = response.profile.section || ''
        studentNumber.value = response.profile.studentNumber || ''
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      throw error
    }
  }





  return { 
    studentNumber,
    email,
    password,
    confirmPassword,
    verificationEmail,
    fullName,
    section,
    unverified,
    studentNumberError,
    emailError,
    passwordError,
    confirmPasswordError,
    otp,
    role,
    isProfileComplete,
    isAuthenticated,


    registerUser,
    verifyAccount,
    login,
    getUser,
   }
})
