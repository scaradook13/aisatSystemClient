<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
      <h2 class="text-2xl font-semibold text-gray-800 tracking-tight">Students</h2>

      <div class="relative w-full sm:w-64">
        <input
          v-model="search"
          type="text"
          placeholder="Search student..."
          class="border rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-2.5 text-gray-400"
             width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden min-h-[300px]">
      <table class="min-w-full border-collapse">
        <thead class="bg-gray-50 text-left text-gray-600 uppercase text-sm font-semibold">
          <tr>
            <th class="px-6 py-3">Student Number</th>
            <th class="px-6 py-3">Full Name</th>
            <th class="px-6 py-3">Section</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="student._id" class="border-t hover:bg-gray-50 transition">
            <td class="px-6 py-3 font-medium text-gray-800">{{ student.studentNumber }}</td>
            <td class="px-6 py-3">{{ student.fullName }}</td>
            <td class="px-6 py-3">{{ student.section }}</td>
            <td class="px-6 py-3 text-right">
              <div class="flex justify-end items-center gap-2">
                <!-- Edit -->
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
                <!-- Delete -->
                <button
                  @click="openDeleteModal(index)"
                  class="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 11v6"/><path d="M14 11v6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                    <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <!-- Empty state row to keep table height -->
          <tr v-if="filteredStudents.length === 0">
            <td colspan="4" class="text-center py-16 text-gray-400">No students found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">
          {{ isEditing ? 'Edit Student' : 'Add New Student' }}
        </h3>

        <form @submit.prevent="isEditing ? updateStudent() : addStudent()">
          <div class="mb-4">
            <label class="block text-gray-600 text-sm mb-1">Student Number</label>
            <input
              v-model="form.studentNumber"
              type="text"
              placeholder="e.g. 2025-001"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              v-model="form.fullName"
              type="text"
              placeholder="e.g. John Doe"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="mb-5">
            <label class="block text-gray-600 text-sm mb-1">Section</label>
            <input
              v-model="form.section"
              type="text"
              placeholder="e.g. GC1MA"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="closeFormModal"
                    class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit"
                    class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              {{ isEditing ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 animate-fadeIn">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Delete Student</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete
          <strong>{{ students[selectedIndex]?.fullName }}</strong>?
        </p>

        <div class="flex justify-end gap-3">
          <button @click="closeDeleteModal"
                  class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button @click="deleteStudent"
                  class="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/AdminStore'

const adminStore = useAdminStore()
const { students } = storeToRefs(adminStore)

const search = ref("")

onMounted(() => adminStore.fetchStudents())

// Filtered students
const filteredStudents = computed(() =>
  students.value.filter(s =>
    s.fullName.toLowerCase().includes(search.value.toLowerCase()) ||
    s.studentNumber.toString().includes(search.value) ||
    s.section.toLowerCase().includes(search.value.toLowerCase())
  )
)

// Modal + form state
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedIndex = ref(null)
const form = ref({ studentNumber: '', fullName: '', section: '' })

// Modal handlers

const openEditModal = (index) => {
  isEditing.value = true
  selectedIndex.value = index
  form.value = JSON.parse(JSON.stringify(students.value[index]))
  showFormModal.value = true
}

const openDeleteModal = (index) => {
  selectedIndex.value = index
  showDeleteModal.value = true
}

const closeFormModal = () => (showFormModal.value = false)
const closeDeleteModal = () => (showDeleteModal.value = false)

// CRUD operations
const addStudent = async () => {
  await adminStore.addStudent(form.value)
  closeFormModal()
}

const updateStudent = async () => {
  if (selectedIndex.value !== null) {
    const studentId = students.value[selectedIndex.value]._id
    await adminStore.updateStudent(studentId, form.value)
    closeFormModal()
  }
}

const deleteStudent = async () => {
  if (selectedIndex.value !== null) {
    const studentId = students.value[selectedIndex.value]._id
    await adminStore.deleteStudent(studentId)
    closeDeleteModal()
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn { animation: fadeIn 0.2s ease-out; }
</style>
