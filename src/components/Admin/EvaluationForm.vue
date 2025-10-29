<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-normal text-gray-900">Evaluation Form Settings</h1>
            <p class="text-sm text-gray-600 mt-1">Configure evaluation categories and questions</p>
          </div>
          <button
            @click="openNewFormModal = true"
            class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium shadow-sm"
          >
            <Plus class="w-5 h-5" />
            Create New Form
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Active Form Card -->
      <div v-if="activeFormComputed?._id" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">ACTIVE</span>
                <h2 class="text-base font-medium text-gray-900">{{ activeFormComputed.formDate }}</h2>
              </div>
            </div>
          </div>
          <button
            @click="openEditFormModalHandler()"
            class="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Edit Form
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div v-if="activeFormComputed?._id" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 justify-center">
        <!-- Categories -->
        <div class="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
          </div>
          <div class="text-3xl font-semibold text-gray-900 mb-1">{{ totalCategories }}</div>
          <div class="text-sm text-gray-600">Categories</div>
        </div>

        <!-- Questions -->
        <div class="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="text-3xl font-semibold text-gray-900 mb-1">{{ totalQuestions }}</div>
          <div class="text-sm text-gray-600">Total Questions</div>
        </div>
      </div>

      <!-- Categories Grid or Placeholder -->
      <template v-if="categories.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            v-for="(category, index) in categories"
            :key="category._id"
            class="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all group"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div
                    :class="getCategoryColorClass(index)"
                    class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                  >
                    <span class="text-white font-semibold text-lg">{{ getRomanNumeral(index) }}</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">{{ category.title }}</h3>
                    <p class="text-sm text-gray-500 mt-0.5">{{ category.questions.length }} questions configured</p>
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="openEditCategoryModal(index)"
                  class="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
                >
                  <Edit class="w-4 h-4" />
                  Edit
                </button>
                <button
                  @click="confirmDeleteCategory(index)"
                  class="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="activeFormComputed?._id">
        <div class="flex flex-col items-center justify-center p-12 rounded-xl border border-gray-200 bg-white gap-3 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p class="text-lg font-medium text-gray-700">No categories yet</p>
          <p class="text-sm text-gray-500 max-w-md">Get started by creating your first evaluation category. Categories help organize questions by topic or skill area.</p>
          <button
            @click="openAddCategoryModal = true"
            class="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Add First Category
          </button>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col items-center justify-center p-12 rounded-xl border border-gray-200 bg-white gap-3 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p class="text-lg font-medium text-gray-700">No active evaluation form</p>
          <p class="text-sm text-gray-500 max-w-md">Create an evaluation form to begin setting up categories and questions for teacher assessments.</p>
          <button
            @click="openNewFormModal = true"
            class="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Create Evaluation Form
          </button>
        </div>
      </template>

      <!-- Add Category Button -->
      <button
        v-if="activeFormComputed?._id && categories.length > 0"
        @click="openAddCategoryModal = true"
        class="w-full bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 transition-all group"
      >
        <div class="flex flex-col items-center gap-2">
          <div class="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
            <Plus class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </div>
          <span class="text-base font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Add New Category</span>
        </div>
      </button>
    </div>

    <!-- MODALS -->
    <!-- New Form Modal -->
    <transition name="fade">
      <div v-if="openNewFormModal" @click.self="openNewFormModal = false" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Create New Form</h3>
          <form @submit.prevent="createNewForm">
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Form Name</label>
              <input
                type="text"
                v-model="newForm.name"
                placeholder="e.g., 1st Quarter of 1st Semester (S.Y. 2025-2026)"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div class="flex justify-end gap-3">
              <button type="button" @click="openNewFormModal = false" class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors">Cancel</button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">Create</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Edit Form Modal -->
    <transition name="fade">
      <div v-if="openEditFormModal" @click.self="openEditFormModal = false" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Edit Form</h3>
          <form @submit.prevent="saveForm">
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Form Name</label>
              <input
                type="text"
                v-model="editFormData.formDate"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div class="flex justify-end gap-3">
              <button type="button" @click="openEditFormModal = false" class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors">Cancel</button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Edit Category Modal -->
    <transition name="fade">
      <div v-if="openEditModal" @click.self="openEditModal = false" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
        <div class="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl my-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Edit Category</h3>
          <form @submit.prevent="saveCategory">
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">Category Title</label>
              <input
                type="text"
                v-model="editCategoryData.title"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-3">Questions</label>
              <div class="space-y-3 max-h-96 overflow-y-auto pr-2">
                <div
                  v-for="(question, qIndex) in editCategoryData.questions"
                  :key="qIndex"
                  class="flex gap-2 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <input
                    type="text"
                    :value="generateQuestionId(editIndex, qIndex)"
                    disabled
                    class="w-24 border border-gray-200 bg-gray-100 text-gray-700 p-2 rounded-lg cursor-not-allowed"
                    readonly
                  />
                  <input
                    type="text"
                    v-model="question.text"
                    placeholder="Question text"
                    class="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                  <button
                    type="button"
                    @click="deleteQuestion(qIndex)"
                    class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                type="button"
                @click="addQuestion"
                class="mt-3 w-full px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                + Add Question
              </button>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="confirmDeleteCategory(editIndex)"
                class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
              >
                Delete Category
              </button>
              <div class="flex gap-3">
                <button type="button" @click="openEditModal = false" class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors">Cancel</button>
                <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Add Category Modal -->
    <transition name="fade">
      <div v-if="openAddCategoryModal" @click.self="openAddCategoryModal = false" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
        <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Add New Category</h3>
          <form @submit.prevent="createNewCategory">
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Category Title</label>
              <input
                type="text"
                v-model="newCategory.title"
                placeholder="Enter category title"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div class="flex justify-end gap-3">
              <button type="button" @click="openAddCategoryModal = false" class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors">Cancel</button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">Add Category</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

        <!-- Delete Category Modal -->
    <transition name="fade">
      <div
        v-if="openDeleteCategoryModal"
        @click.self="openDeleteCategoryModal = false"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
      >
        <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl text-center">
          <svg class="w-12 h-12 mx-auto text-red-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 5a7 7 0 100 14 7 7 0 000-14z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Delete Category</h3>
          <p class="text-sm text-gray-600 mb-6">Are you sure you want to delete <strong>{{ categoryToDelete?.title }}</strong>? This action cannot be undone.</p>
          <div class="flex justify-center gap-3">
            <button
              @click="openDeleteCategoryModal = false"
              class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors"
            >Cancel</button>
            <button
              @click="deleteCategoryConfirmed"
              class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
            >Delete</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Question Modal -->
    <transition name="fade">
      <div
        v-if="openDeleteQuestionModal"
        @click.self="openDeleteQuestionModal = false"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
      >
        <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl text-center">
          <svg class="w-12 h-12 mx-auto text-red-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 5a7 7 0 100 14 7 7 0 000-14z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Delete Question</h3>
          <p class="text-sm text-gray-600 mb-6">Are you sure you want to delete this question? This cannot be undone.</p>
          <div class="flex justify-center gap-3">
            <button
              @click="openDeleteQuestionModal = false"
              class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors"
            >Cancel</button>
            <button
              @click="deleteQuestionConfirmed"
              class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
            >Delete</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Edit, Plus } from 'lucide-vue-next'
import { useAdminStore } from '@/stores/AdminStore'

const adminStore = useAdminStore()
const { activeForm } = storeToRefs(adminStore)
const activeFormComputed = computed(() => activeForm.value)

const categories = ref([])

// Modals
const openNewFormModal = ref(false)
const newForm = ref({ name: '' })

const openEditFormModal = ref(false)
const editFormData = ref({ formDate: '', _id: '' })

const openEditModal = ref(false)
const editIndex = ref(null)
const editCategoryData = ref({ title: '', questions: [], _id: '' })

const openAddCategoryModal = ref(false)
const newCategory = ref({ title: '' })

// Computed Stats
const totalCategories = computed(() => categories.value.length)

const totalQuestions = computed(() => {
  return categories.value.reduce((sum, cat) => sum + cat.questions.length, 0)
})


// Helper functions
const getCategoryColorClass = (index) => {
  const colors = [
    'bg-gradient-to-br from-blue-500 to-blue-600',
    'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-gradient-to-br from-green-500 to-green-600',
    'bg-gradient-to-br from-orange-500 to-orange-600',
    'bg-gradient-to-br from-pink-500 to-pink-600',
    'bg-gradient-to-br from-teal-500 to-teal-600',
    'bg-gradient-to-br from-indigo-500 to-indigo-600',
    'bg-gradient-to-br from-red-500 to-red-600'
  ]
  return colors[index % colors.length]
}

const getRomanNumeral = (index) => {
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return numerals[index] || (index + 1).toString()
}

const generateQuestionId = (categoryIndex, questionIndex) => {
  if (categoryIndex === null || categoryIndex === undefined) return ''
  const categoryNumber = categoryIndex + 1
  const questionNumber = questionIndex + 1
  return `${categoryNumber}.${questionNumber}`
}


// Map categories safely
const mapActiveFormToCategories = () => {
  if (!activeFormComputed.value || !activeFormComputed.value.formData) {
    categories.value = []
    return
  }
  
  categories.value = activeFormComputed.value.formData.map(cat => ({
    title: cat.title || 'Untitled Category',
    questions: (cat.questionsIds || []).map(q => ({
      id: q.id || '',
      text: q.text || '',
      _id: q._id
    })),
    _id: cat._id
  }))
}

// Lifecycle
onMounted(async () => {
  try {
    await adminStore.fetchActiveForm()
    mapActiveFormToCategories()
  } catch (error) {
    console.error('Error fetching active form:', error)
  }
})

// New Form
const createNewForm = async () => {
  if (!newForm.value.name.trim()) return
  
  try {
    await adminStore.addForm({ formDate: newForm.value.name, formData: [] })
    newForm.value.name = ''
    openNewFormModal.value = false
    await adminStore.fetchActiveForm()
    mapActiveFormToCategories()
  } catch (error) {
    console.error('Error creating form:', error)
    alert('Failed to create form. Please try again.')
  }
}

// Edit Active Form
const openEditFormModalHandler = () => {
  if (!activeFormComputed.value) return
  editFormData.value = {
    formDate: activeFormComputed.value.formDate,
    _id: activeFormComputed.value._id
  }
  openEditFormModal.value = true
}

const saveForm = async () => {
  if (!editFormData.value.formDate.trim()) return
  
  try {
    await adminStore.updateForm(editFormData.value._id, {
      formDate: editFormData.value.formDate
    })
    openEditFormModal.value = false
    await adminStore.fetchActiveForm()
    mapActiveFormToCategories()
  } catch (error) {
    console.error('Error updating form:', error)
    alert('Failed to update form. Please try again.')
  }
}

// Edit Category
const openEditCategoryModal = (index) => {
  if (index < 0 || index >= categories.value.length) return
  
  editIndex.value = index
  editCategoryData.value = JSON.parse(JSON.stringify(categories.value[index]))
  openEditModal.value = true
}

const saveCategory = async () => {
  if (!editCategoryData.value.title.trim()) {
    alert('Category title is required.')
    return
  }
  
  try {
    // Update category title and questions
    await adminStore.updateCategory(editCategoryData.value._id, {
      title: editCategoryData.value.title,
    })

    // Handle individual questions
    for (const question of editCategoryData.value.questions) {
      if (!question._id) {
        // New question
        await adminStore.addQuestion({
          id: question.id,
          text: question.text,
          categoryId: editCategoryData.value._id
        })
      } else {
        // Update existing question
        await adminStore.updateQuestion(question._id, {
          id: question.id,
          text: question.text
        })
      }
    }

    openEditModal.value = false
    await adminStore.fetchActiveForm()
    mapActiveFormToCategories()
  } catch (error) {
    console.error('Error saving category:', error)
    alert('Failed to save category. Please try again.')
  }
}

// Trigger Delete Category Modal
const confirmDeleteCategory = (index) => {
  if (index < 0 || index >= categories.value.length) return
  categoryToDelete.value = categories.value[index]
  categoryToDeleteIndex.value = index
  openDeleteCategoryModal.value = true
}

const deleteCategoryConfirmed = async () => {
  if (categoryToDeleteIndex.value === null) return
  try {
    await adminStore.deleteCategory(categoryToDelete.value._id)
    openDeleteCategoryModal.value = false
    openEditModal.value = false
    await adminStore.fetchActiveForm()
    mapActiveFormToCategories()
  } catch (error) {
    console.error('Error deleting category:', error)
    alert('Failed to delete category. Please try again.')
  } finally {
    categoryToDelete.value = null
    categoryToDeleteIndex.value = null
  }
}

// Questions
const addQuestion = () => {
  if (editIndex.value === null) return
  const newQuestionIndex = editCategoryData.value.questions.length
  const newQuestionId = generateQuestionId(editIndex.value, newQuestionIndex)
  editCategoryData.value.questions.push({ id: newQuestionId, text: '', _id: null })
}

// Trigger Delete Question Modal
const deleteQuestion = (qIndex) => {
  if (qIndex < 0 || qIndex >= editCategoryData.value.questions.length) return
  questionToDeleteIndex.value = qIndex
  openDeleteQuestionModal.value = true
}

// Confirm Delete Question
const deleteQuestionConfirmed = async () => {
  if (questionToDeleteIndex.value === null) return
  adminStore.deleteQuestion(editCategoryData.value.questions[questionToDeleteIndex.value]._id)
  editCategoryData.value.questions.splice(questionToDeleteIndex.value, 1)
  openDeleteQuestionModal.value = false
  questionToDeleteIndex.value = null
}

// Add Category
const createNewCategory = async () => {
  if (!newCategory.value.title.trim()) {
    alert('Category title is required.')
    return
  }
  
  if (!activeFormComputed.value?._id) {
    alert('No active form found.')
    return
  }
  
  try {
    await adminStore.addCategory({
      title: newCategory.value.title,
      formId: activeFormComputed.value._id
    })
    
    newCategory.value.title = ''
    openAddCategoryModal.value = false
    await adminStore.fetchActiveForm()
    mapActiveFormToCategories()
  } catch (error) {
    console.error('Error creating category:', error)
    alert('Failed to create category. Please try again.')
  }
}

// Delete Modals
const openDeleteCategoryModal = ref(false)
const categoryToDelete = ref(null)
const categoryToDeleteIndex = ref(null)

const openDeleteQuestionModal = ref(false)
const questionToDeleteIndex = ref(null)

</script>