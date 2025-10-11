<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-900 mb-6">
      Evaluation Form Settings
    </h2>

    <!-- Categories List -->
    <div class="space-y-4">
      <div
        v-for="(category, index) in categories"
        :key="index"
        :class="[
          'flex items-center justify-between p-4 rounded-lg border transition-colors',
          category.color.bg,
          category.color.border
        ]"
      >
        <div>
          <h3 class="text-lg font-medium text-gray-900">
            {{ category.title }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ category.questions.length }} questions
          </p>
        </div>
        <button
          @click="editCategory(index)"
          :class="[
            'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition',
            category.color.button
          ]"
        >
          <Edit class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Add Category -->
    <div class="mt-6 text-center">
      <button
        @click="addCategory"
        class="w-full py-3 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
      >
        <Plus class="w-4 h-4" />
        Add New Category
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Plus } from 'lucide-vue-next'

const categories = ref([
  {
    title: 'I. Teaching Competence',
    questions: [
      'Analyzes and elaborates lesson without reading the textbook in class',
      'Uses audio-visual aids to support instruction',
      'Presents facts clearly and integrates with experience',
      'Makes students apply concepts',
      'Gives fair tests and returns results on time',
      'Shows good command of the language of instruction'
    ],
    color: { bg: 'bg-blue-50', border: 'border-blue-200', button: 'bg-blue-500 text-white hover:bg-blue-600' }
  },
  {
    title: 'II. Management Skills',
    questions: [
      'Maintains a responsive and disciplined classroom',
      'Follows systematic schedule',
      'Stimulates respect and regard for the teacher',
      'Allows students to express their opinions'
    ],
    color: { bg: 'bg-green-50', border: 'border-green-200', button: 'bg-green-500 text-white hover:bg-green-600' }
  },
  {
    title: 'III. Guidance Skills',
    questions: [
      'Accepts students as they are',
      'Inspires self-discipline',
      'Handles problems with fairness',
      'Shows concern for personal problems'
    ],
    color: { bg: 'bg-purple-50', border: 'border-purple-200', button: 'bg-purple-500 text-white hover:bg-purple-600' }
  },
  {
    title: 'IV. Personal and Social Qualities',
    questions: [
      'Maintains emotional balance',
      'Is free from distracting mannerisms',
      'Is well-groomed and neat',
      'Is fair and impartial',
      'Has good sense of humor',
      'Has clear and modulated voice'
    ],
    color: { bg: 'bg-orange-50', border: 'border-orange-200', button: 'bg-orange-500 text-white hover:bg-orange-600' }
  }
])

const editCategory = (index) => {
  alert(`Edit category: ${categories.value[index].title}`)
}

const addCategory = () => {
  const newIndex = categories.value.length + 1
  categories.value.push({
    title: `New Category ${newIndex}`,
    questions: [],
    color: { bg: 'bg-gray-50', border: 'border-gray-200', button: 'bg-gray-500 text-white hover:bg-gray-600' }
  })
}
</script>
