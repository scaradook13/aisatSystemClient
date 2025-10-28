import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Verification from '@/views/Verification.vue'
import CompleteProfile from '@/views/Student/CompleteProfile.vue'
import Form from '@/views/Student/Form.vue'
import AdminDashboard from '@/views/Admin/AdminDashboard.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useAdminStore } from '@/stores/AdminStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guestOnly: true },
    },
    {
      path: '/verification',
      name: 'verification',
      component: Verification,
      meta: { guestOnly: true },
    },
    {
      path: '/completeProfile',
      name: 'completeProfile',
      component: CompleteProfile,
      meta: { requiresAuth: true, role: 'Student' },
    },
    {
      path: '/',
      name: 'form',
      component: Form,
      meta: { requiresAuth: true, role: 'Student' },
    },
    {
      path: '/adminDashboard',
      name: 'adminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, role: 'Admin' },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const adminStore = useAdminStore()

  // Skip auth check if already going to guest-only pages
  if (to.meta.guestOnly) {
    try {
      await authStore.getUser()
      const userRole = authStore.role
      
      // If authenticated, redirect to appropriate dashboard
      if (userRole) {
        if (userRole === 'Admin') {
          await adminStore.fetchTeachers()
          await adminStore.fetchSections()
          return next('/adminDashboard')
        } else {
          return next('/')
        }
      }
      
      // Not authenticated, allow access to guest pages
      return next()
    } catch (error) {
      // Not authenticated, allow access to guest pages
      return next()
    }
  }

  // For all other routes, check authentication
  try {
    await authStore.getUser()
    const userRole = authStore.role

    // If route requires authentication
    if (to.meta.requiresAuth) {
      if (!userRole) {
        return next({ path: '/login' })
      }

      // Check if user has permission for this route
      if (to.meta.role && to.meta.role !== userRole) {
        if (userRole === 'Admin') {
          return next('/adminDashboard')
        } else {
          return next('/')
        }
      }

      return next()
    }
    
    // If route doesn't require auth → continue
    next()
  } catch (error) {
    // If getUser fails (401 Unauthorized) → redirect to login
    return next({ path: '/login' })
  }
})

export default router