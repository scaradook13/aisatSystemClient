<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">Dashboard Overview</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="card in cards"
        :key="card.title"
        class="bg-white rounded-lg p-6 shadow-sm flex items-center justify-between border-0 "
      >
        <div>
          <p class="text-sm text-gray-500">{{ card.title }}</p>
          <p class="text-2xl font-bold text-gray-800 mt-1">{{ card.value }}</p>
        </div>
        <component :is="card.icon" class="w-7 h-7 text-blue-600" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Users, GraduationCap, BookOpen, FileEdit } from 'lucide-vue-next'

const cards = [
  { title: 'Total Teachers', value: 24, icon: Users },
  { title: 'Total Students', value: 456, icon: GraduationCap },
  { title: 'Total Sections', value: 12, icon: BookOpen },
  { title: 'Evaluations Submitted', value: 234, icon: FileEdit },
]
</script>
