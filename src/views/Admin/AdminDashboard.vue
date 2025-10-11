<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div class="px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <component :is="isSidebarOpen ? X : Menu" class="w-6 h-6" />
          </button>
          <h1 class="text-xl font-bold text-gray-900">AISAT Admin</h1>
        </div>
        <button class="text-gray-600 hover:text-gray-900">
          <LogOut class="w-5 h-5" />
        </button>
      </div>
    </header>

    <!-- Layout -->
    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed lg:static inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 mt-[65px] lg:mt-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
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
  FileEdit, Award, LogOut
} from 'lucide-vue-next'
import { ref, computed } from 'vue'

// Import tab components
import Overview from '@/components/Admin/Overview.vue'
import Teachers from '@/components/Admin/Teachers.vue'
import Sections from '@/components/Admin/Sections.vue'
import Students from '@/components/Admin/Students.vue'
import EvaluationForm from '@/components/Admin/EvaluationForm.vue'
import Ranking from '@/components/Admin/Ranking.vue'

const isSidebarOpen = ref(false)
const activeTab = ref('overview')

const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'teachers', label: 'Teachers', icon: Users },
  { id: 'sections', label: 'Sections', icon: BookOpen },
  { id: 'students', label: 'Students', icon: GraduationCap },
  { id: 'evaluation', label: 'Evaluation Form', icon: FileEdit },
  { id: 'ranking', label: 'Rankings', icon: Award }
]

const componentsMap = {
  overview: Overview,
  teachers: Teachers,
  sections: Sections,
  students: Students,
  evaluation: EvaluationForm,
  ranking: Ranking
}

const currentComponent = computed(() => componentsMap[activeTab.value])

const setTab = (tab) => {
  activeTab.value = tab
  isSidebarOpen.value = false
}
</script>
