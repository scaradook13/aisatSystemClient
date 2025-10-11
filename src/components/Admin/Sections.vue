<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold">Sections</h2>
      <button
        @click="addSection"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Add Section
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm p-4">
      <ul class="divide-y divide-gray-200">
        <li v-for="(section, index) in sections" :key="index" class="py-3 px-2 flex justify-between items-center">
          <span class="text-gray-800 font-medium">{{ section }}</span>
          <div class="flex items-center gap-1.5">
            <button class="text-blue-600 hover:underline" @click="removeSection(index)"><SquarePen/></button>
            <button class="text-red-600 hover:underline" @click="removeSection(index)"><trash2/></button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Trash2,SquarePen  } from 'lucide-vue-next'
import { ref } from 'vue'

const sections = ref(['BSIT 1A', 'BSIT 1B', 'BSIT 2A', 'BSIT 2B'])

const addSection = () => {
  const name = prompt('Enter new section:')
  if (name) sections.value.push(name)
}

const removeSection = (index) => {
  sections.value.splice(index, 1)
}
</script>
