import { createRouter, createWebHistory } from 'vue-router'
import { apiStatus } from '@/stores/apiStatus'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Verification from '@/views/Verification.vue'
import Form from '@/views/Student/Form.vue'
import AdminDashboard from '@/views/Admin/AdminDashboard.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ApiStatus from '@/views/ApiStatus.vue'
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
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword,
      meta: { guestOnly: true },
    },
    {
      path: '/apiStatus',
      name: 'apiStatus',
      component: ApiStatus,
      meta: { guestOnly: true },
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

async function checkApiConnection() {
  try {
    const res = await AuthService.ping()
    apiStatus.reachable = !!res.success
  } catch {
    apiStatus.reachable = false
  } finally {
    apiStatus.checked = true
  }
}

// ---- Router Guard ---- //
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const adminStore = useAdminStore()

  if (to.name === 'apiStatus') {
    await checkApiConnection()
    if (apiStatus.reachable) {
      return next({ name: 'login' })
    }
    return next()
  }

  if (!apiStatus.checked) {
    await checkApiConnection()
  }

  if (!apiStatus.reachable) {
    return next({ name: 'apiStatus' })
  }

  // 🚨 Verification protection
  if (to.name === "verification" && !authStore.email) {
    alert("Your verification session has expired. Please register again.")
    return next("/register")
  }

  // 🧭 Guest-only routes
  if (to.meta.guestOnly) {
    try {
      await authStore.getUser()
      const userRole = authStore.role
      if (userRole) {
        if (userRole === 'Admin') {
          await adminStore.fetchTeachers()
          await adminStore.fetchSections()
          return next('/adminDashboard')
        } else {
          return next('/')
        }
      }
      return next()
    } catch {
      return next()
    }
  }

  // 🔐 Auth routes
  try {
    await authStore.getUser()
    const userRole = authStore.role

    if (to.meta.requiresAuth) {
      if (!userRole) return next({ path: '/login' })

      if (to.meta.role && to.meta.role !== userRole) {
        return next(userRole === 'Admin' ? '/adminDashboard' : '/')
      }
    }

    next()
  } catch {
    return next({ path: '/login' })
  }
})



export default router