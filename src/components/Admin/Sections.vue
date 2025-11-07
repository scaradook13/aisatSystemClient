<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900 tracking-tight">Sections</h2>
        <p class="text-sm text-gray-500 mt-1">Manage and organize all available sections.</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search sections..."
            class="pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
          @click="openAddModal"
          class="bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition-all duration-150"
        >
          + Add Section
        </button>
      </div>
    </div>

    <!-- Card -->
    <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <ul class="divide-y divide-gray-100">
        <li
          v-for="(section, index) in filteredSections"
          :key="section._id || index"
          class="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <span class="text-gray-900 font-medium">{{ section.section }}</span>

          <div class="flex items-center gap-2">
            <!-- Edit -->
            <button
              @click="openEditModal(index)"
              class="text-blue-600 hover:text-blue-700 p-1.5 rounded-full hover:bg-blue-50 transition"
              title="Edit section"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
              </svg>
            </button>

            <!-- Delete -->
            <button
              @click="openDeleteModal(index)"
              class="text-red-600 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition"
              title="Delete section"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M10 11v6M14 11v6M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </li>
      </ul>

      <!-- Empty State -->
      <div
        v-if="filteredSections.length === 0"
        class="text-center py-10 text-gray-500 text-sm"
      >
        No matching sections found.
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">
          {{ isEditing ? 'Edit Section' : 'Add New Section' }}
        </h3>

        <form @submit.prevent="isEditing ? updateSection() : addSection()">
          <div class="mb-5">
            <label class="block text-gray-600 text-sm mb-1">Section Name</label>
            <input
              v-model="form.section"
              type="text"
              placeholder="e.g. GC1MA"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
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
              class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {{ isEditing ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 animate-fadeIn">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Delete Section</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete
          <strong>{{ sections[selectedIndex]?.section }}</strong>?
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="deleteSection"
            class="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/AdminStore'

const adminStore = useAdminStore()
const { sections } = storeToRefs(adminStore)

// Lifecycle
onMounted(async () => {
  await adminStore.fetchSections()
})

// State
const searchQuery = ref('')
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedIndex = ref(null)
const form = ref({ section: '' })

// Computed: filtered sections
const filteredSections = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return query
    ? sections.value.filter(s =>
        s.section.toLowerCase().includes(query)
      )
    : sections.value
})

// Modal handlers
const openAddModal = () => {
  isEditing.value = false
  form.value = { section: '' }
  showFormModal.value = true
}

const openEditModal = (index) => {
  isEditing.value = true
  selectedIndex.value = index
  form.value = JSON.parse(JSON.stringify(sections.value[index]))
  showFormModal.value = true
}

const openDeleteModal = (index) => {
  selectedIndex.value = index
  showDeleteModal.value = true
}

const closeFormModal = () => (showFormModal.value = false)
const closeDeleteModal = () => (showDeleteModal.value = false)

// CRUD
const addSection = async () => {
  await adminStore.addSection(form.value)
  closeFormModal()
}

const updateSection = async () => {
  if (selectedIndex.value !== null) {
    const id = sections.value[selectedIndex.value]._id
    await adminStore.updateSection(id, form.value)
    closeFormModal()
  }
}

const deleteSection = async () => {
  if (selectedIndex.value !== null) {
    const id = sections.value[selectedIndex.value]._id
    await adminStore.deleteSection(id)
    closeDeleteModal()
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.25s ease-out;
}
</style>
