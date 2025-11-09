<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div class="px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="text-gray-600 hover:text-gray-900"
          >
            <component :is="isSidebarOpen ? X : Menu" class="w-6 h-6" />
          </button>
          <h1 class="text-xl font-bold text-gray-900">AISAT Admin</h1>
        </div>
        <button
          @click="handleLogout"
          class="flex items-center gap-2 bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all rounded-lg px-3 py-2 shadow-sm text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          <span class="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>

    <!-- Overlay when sidebar open -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/40 z-10"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Layout -->
    <div class="flex relative">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <nav class="p-4 space-y-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setTab(tab.id)"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
              activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <component :is="tab.icon" class="w-5 h-5" />
            <span class="font-medium">{{ tab.label }}</span>
          </button>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-4 lg:p-8">
        <component :is="currentComponent" />
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  Menu, X, Home, Users, BookOpen, GraduationCap,
  FileEdit, Award
} from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useToast } from "vue-toastification";
const toast = useToast();
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore();


// Import tab components
import Overview from '@/components/Admin/Overview.vue'
import Teachers from '@/components/Admin/Teachers.vue'
import Sections from '@/components/Admin/Sections.vue'
import Students from '@/components/Admin/Students.vue'
import EvaluationForm from '@/components/Admin/EvaluationForm.vue'
import Ranking from '@/components/Admin/Ranking.vue'
import EnrolledStudents from '@/components/Admin/EnrolledStudents.vue'
import EvaluationResults from '@/components/Admin/EvaluationResults.vue'

const isSidebarOpen = ref(false)
const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'evaluation', label: 'Evaluation Form', icon: FileEdit },
  { id: 'sections', label: 'Sections', icon: BookOpen },
  { id: 'teachers', label: 'Teachers', icon: Users },
  { id: 'enrolledStudents', label: 'Enrolled Students', icon: GraduationCap },
  { id: 'students', label: 'Registered Students', icon: GraduationCap },
  { id: 'evaluationResults', label: 'Evaluation Results', icon: Award },
  { id: 'ranking', label: 'Rankings', icon: Award },
]

const componentsMap = {
  overview: Overview,
  teachers: Teachers,
  sections: Sections,
  students: Students,
  evaluation: EvaluationForm,
  ranking: Ranking,
  enrolledStudents: EnrolledStudents,
  evaluationResults: EvaluationResults
}

const currentComponent = computed(() => componentsMap[activeTab.value])

const setTab = (tab) => {
  activeTab.value = tab
  isSidebarOpen.value = false
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    toast.success("Logged out successfully.")
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  } catch (err) {
    console.error(err)
    toast.error("Logout failed.")
  }
}
</script>
