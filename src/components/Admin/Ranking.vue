<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900 mb-6">Teacher Rankings</h2>

    <div class="space-y-3">
      <div
        v-for="(teacher, index) in teachers"
        :key="teacher.name"
        class="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg"
      >
        <!-- Left Section -->
        <div class="flex items-center gap-4">
          <!-- Rank Circle -->
          <div
            :class="[
              'w-10 h-10 flex items-center justify-center font-bold text-gray-900 rounded-full',
              getRankColor(index)
            ]"
          >
            {{ index + 1 }}
          </div>

          <!-- Info -->
          <div>
            <p class="font-semibold text-gray-900">{{ teacher.name }}</p>
            <p class="text-sm text-gray-600">{{ teacher.department }}</p>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-3">
          <div class="text-right">
            <p class="text-lg font-semibold text-gray-900">{{ teacher.rating }}</p>
            <p class="text-xs text-gray-500">{{ teacher.evaluations }} evaluations</p>
          </div>
          <button class="text-blue-600 hover:text-blue-800 transition">
            <Eye class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Eye } from 'lucide-vue-next'

const teachers = ref([
  { name: 'Prof. John Smith', department: 'Computer Science', rating: 4.8, evaluations: 45 },
  { name: 'Dr. Maria Garcia', department: 'Mathematics', rating: 4.6, evaluations: 42 },
  { name: 'Prof. Robert Chen', department: 'Engineering', rating: 4.5, evaluations: 38 },
  { name: 'Dr. Sarah Johnson', department: 'Science', rating: 4.3, evaluations: 35 }
])

// Dynamic rank color for top 3
const getRankColor = (index) => {
  switch (index) {
    case 0:
      return 'bg-yellow-100 text-yellow-700'
    case 1:
      return 'bg-gray-200 text-gray-700'
    case 2:
      return 'bg-orange-100 text-orange-700'
    default:
      return 'bg-gray-100 text-gray-500'
  }
}
</script>
