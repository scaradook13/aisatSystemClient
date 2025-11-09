import { ref } from 'vue'
import AuthService from '@/api/AuthService.js'
import emailAuth from '@/api/emailAuth'
import router from '@/router'
import { defineStore } from 'pinia'
import { useToast } from "vue-toastification";
const toast = useToast();

export const useAuthStore = defineStore('Auth', () => {
    const id = ref('')
    const studentNumber = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const middleName = ref('')
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
    const verificationCode = ref('')
    const newPassword = ref('')
    const isSending = ref(false)
    const countdown = ref(0)
    const timer = ref(null)

    const registerUser = async () => {
    try {
    if (!firstName.value.trim()) return toast.error("First Name is required")
      if (!lastName.value.trim()) return toast.error("Last Name is required")

      if (middleName.value && middleName.value.length < 2) {
        return toast.error("Middle Name must be at least 2 characters")
      }

      if (!studentNumber.value) return toast.error("Student Number is required")
      if (!email.value) return toast.error("Email is required")

      if (!password.value) return toast.error("Password can't be empty")
      if (password.value.length < 8)
        return toast.error("Password must be at least 8 characters")
      if (password.value !== confirmPassword.value)
        return toast.error("Passwords do not match")

      verificationEmail.value = email.value
      await AuthService.register({
        studentNumber: studentNumber.value,
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value
      })
      router.push({ name: 'verification' })

    } catch (err) {
      console.log(err)

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed"
        toast.warning(errorMessage)
    }
  }

  
    const verifyAccount = async () => {
      try {
        const response = await AuthService.verifyAccount({
          studentNumber: studentNumber.value,
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          middleName: middleName.value,
          lastName: lastName.value,
          otp: otp.value.join(''),
        });
        if (response.success) {
          toast.success(response.message);
          studentNumber.value = '',
          email.value = '',
          password.value = '',
          firstName.value = '',
          middleName.value = '',
          lastName.value = '',
          router.push({ name: "login" });
        } else {
          toast.error(response.message);
        }

      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message);
      }
    };

    const login = async () => {
      try {

        // Reset errors before validation
        emailError.value = '';
        passwordError.value = '';

        // Email validation
        if (!email.value.includes('@')) {
          emailError.value = 'Please enter a valid email address.';
          toast.error(emailError.value);
          return;
        }

        // Send login request
        const response = await AuthService.login({
          email: email.value,
          password: password.value,
        });

        await getUser();
        router.push({ name: 'form' });
        toast.success("Login successful!");

      } catch (err) {
        console.log(err);
        toast.error(err.response?.data || "Something went wrong. Please try again.");
      }
    };

  const getUser = async () => {
    try {
      const response = await AuthService.getUser()
      id.value = response._id || ''
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
      throw error
    }
  }

  const logout = async () => {
    try {
      const response = await AuthService.logout()

    } catch (error) {
      console.error('Failed to logout', error)
      throw error
    }
  }

  const resendVerification = async () => {
    try {
      const result = await emailAuth.resendVerification({ email: email.value });
      toast.success(result.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const requestForgotPassword = async () => {
    if (!email.value) {
      toast.error('Please enter your email first.')
      throw new Error('Email missing')
    }
    try {
      const result = await emailAuth.requestForgotPassword({ email: email.value });
      toast.success(result.message);
      return result;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send code.')
      throw err;
    }
  };

  const verifyForgotPassword = async () => {
    try {
      const result = await AuthService.verifyForgotPassword({ 
        email: email.value,
        otp: verificationCode.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value
       });
      router.push({ name: 'login' })
      toast.success(result.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return { 
    id,
    studentNumber,
    firstName,
    lastName,
    middleName,
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
    verificationCode,
    newPassword,
    isSending,
    countdown,
    timer,


    registerUser,
    verifyAccount,
    login,
    getUser,
    logout,
    resendVerification,
    requestForgotPassword,
    verifyForgotPassword
   }
})
