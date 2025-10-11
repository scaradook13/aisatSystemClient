<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold">Teachers</h2>
      <button
        @click="addTeacher"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Add Teacher
      </button>
    </div>

    <div class="bg-white rounded-2xl shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Section</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="teacher in teachers" :key="teacher.name">
            <td class="px-6 py-4 text-gray-800 font-semibold">{{ teacher.name }}</td>
            <td class="px-6 py-4 text-gray-600">{{ teacher.section }}</td>
            <td class="px-6 py-4 flex items-center gap-1.5">
                <SquarePen class="text-blue-600 w-4 h-4"/>
              <Trash2 class="text-red-600 w-4 h-4"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Trash2,SquarePen  } from 'lucide-vue-next'
import { ref } from 'vue'

const teachers = ref([
  { name: 'Prof. John Smith', section: 'BSIT 1A' },
  { name: 'Dr. Maria Garcia', section: 'BSIT 1B' },
  { name: 'Prof. Robert Chen', section: 'BSIT 2A' },
  { name: 'Dr. Sarah Johnson', section: 'BSIT 2B' },
])

const addTeacher = () => {
  const name = prompt('Enter teacher name:')
  const section = prompt('Enter section:')
  if (name && section) teachers.value.push({ name, section })
}
</script>
