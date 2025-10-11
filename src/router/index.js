import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Form from '@/views/Student/Form.vue'
import AdminDashboard from '@/views/Admin/AdminDashboard.vue'
import { useUserStore } from '@/stores/User.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
    },
    {
      path: '/adminDashboard',
      name: 'adminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true}
    },

  ],
})
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Try to fetch the current user to see if they’re authenticated
    try {

      if (userStore.user === 'admin') {
        next(); // Proceed if authenticated
      } else {
        next({ path: '/login' }); // Redirect to login if not authenticated
      }
    } catch {
      next({ path: '/login' }); // Redirect to login on error
    }
  } else {
    next(); // No auth required, proceed as normal
  }
});

export default router
