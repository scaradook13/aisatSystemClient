<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 tracking-tight">Teachers</h2>
      <button
        @click="openAddModal"
        class="bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition-all duration-150"
      >
        + Add Teacher
      </button>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Sections</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="(teacher, index) in teachers" :key="index" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 text-gray-900 font-medium">{{ teacher.fullName }}</td>
            <td class="px-6 py-4 text-gray-700">
              <!-- Join section names safely -->
              {{
                Array.isArray(teacher.handleSections)
                  ? teacher.handleSections
                      .map(s => (typeof s === 'object' ? s.section : s))
                      .join(', ')
                  : teacher.handleSections
              }}
            </td>
            <td class="px-6 py-4 flex items-center gap-2">
              <!-- Edit Button -->
              <button
                @click="openEditModal(index)"
                class="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>
              </button>

              <!-- Delete Button -->
              <button
                @click="openDeleteModal(index)"
                class="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 11v6"/><path d="M14 11v6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                  <path d="M3 6h18"/>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="teachers.length === 0" class="text-center py-10 text-gray-500 text-sm">
        No teachers added yet.
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">
          {{ isEditing ? 'Edit Teacher' : 'Add New Teacher' }}
        </h3>

        <form @submit.prevent="isEditing ? updateTeacher() : addTeacher()">
          <div class="mb-4">
            <label class="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Enter full name"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <!-- Multiple Checkbox Sections -->
          <div class="mb-5">
            <label class="block text-gray-600 text-sm mb-2">Handled Sections</label>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="section in sections"
                :key="section._id"
                class="flex items-center space-x-2 text-gray-700"
              >
                <input
                  type="checkbox"
                  :value="section.section"
                  v-model="form.handleSections"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{{ section.section }}</span>
              </label>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="closeFormModal"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {{ isEditing ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 animate-fadeIn">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Delete Teacher</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{{ teachers[selectedIndex]?.fullName }}</strong>?
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="deleteTeacher"
            class="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/AdminStore'

const adminStore = useAdminStore()
const { teachers, sections } = storeToRefs(adminStore)

// 🧭 Fetch data on mount
onMounted(async () => {
  await adminStore.fetchTeachers()
  await adminStore.fetchSections()
})

// 🔧 State
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedIndex = ref(null)
const form = ref({ fullName: '', handleSections: [] })

// 🪟 Modal logic
const openAddModal = () => {
  isEditing.value = false
  form.value = { fullName: '', handleSections: [] }
  showFormModal.value = true
}

const openEditModal = (index) => {
  isEditing.value = true
  selectedIndex.value = index
  // Deep copy teacher so edits don't mutate table directly
  form.value = JSON.parse(JSON.stringify(teachers.value[index]))
  showFormModal.value = true
}

const openDeleteModal = (index) => {
  selectedIndex.value = index
  showDeleteModal.value = true
}

const closeFormModal = () => (showFormModal.value = false)
const closeDeleteModal = () => (showDeleteModal.value = false)

const addTeacher = async () => {
  await adminStore.addTeacher(form.value)
  closeFormModal()
}

const updateTeacher = async () => {
  if (selectedIndex.value !== null) {
    const teacherId = teachers.value[selectedIndex.value]._id
    await adminStore.updateTeacher(teacherId, form.value)
    closeFormModal()
  }
}

const deleteTeacher = async () => {
  if (selectedIndex.value !== null) {
    const teacherId = teachers.value[selectedIndex.value]._id
    await adminStore.deleteTeacher(teacherId)
    closeDeleteModal()
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
