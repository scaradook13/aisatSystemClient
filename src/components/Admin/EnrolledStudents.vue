<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 transition-all">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Enrolled Students</h1>
          <p class="text-sm text-gray-500 mt-1">Upload, edit, or delete enrolled students easily.</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Search -->
          <div class="relative w-full sm:w-64">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search students..."
              class="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
          <!-- Upload Excel -->
          <input ref="fileInput" type="file" accept=".xlsx,.xls" @change="handleFileUpload" class="hidden" />
          <button
            @click="fileInput.click()"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
          >
            Upload Excel
          </button>
        </div>
      </div>

      <!-- Preview Mode Banner -->
      <transition name="pop">
        <div v-if="isPreviewMode" class="mb-4 flex justify-between items-center bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl p-3">
          <p class="text-sm font-medium">Preview Mode — showing data from uploaded Excel.</p>
          <div class="flex gap-2">
            <button @click="cancelPreview" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg text-sm">Cancel</button>
            <button @click="savePreview" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm">Save</button>
          </div>
        </div>
      </transition>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-blue-50 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p class="text-sm text-gray-500">Total Students</p>
            <p class="text-2xl font-semibold text-gray-800">{{ enrolledStudent.length }}</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5V4H2v16h5m10-9H7m5 5H7m5-10H7" />
            </svg>
          </div>
        </div>
        <div class="bg-green-50 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p class="text-sm text-gray-500">With Middle Name</p>
            <p class="text-2xl font-semibold text-gray-800">{{ studentsWithMiddleName }}</p>
          </div>
          <div class="p-3 bg-green-100 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <div class="bg-purple-50 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p class="text-sm text-gray-500">Without Middle Name</p>
            <p class="text-2xl font-semibold text-gray-800">{{ studentsWithoutMiddleName }}</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div v-if="filteredStudents.length" class="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div class="max-h-[580px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-100 sticky top-0 z-10 shadow-sm text-gray-700 font-medium">
              <tr>
                <th class="px-4 py-3 border-b">Student Number</th>
                <th class="px-4 py-3 border-b">First Name</th>
                <th class="px-4 py-3 border-b">Middle Name</th>
                <th class="px-4 py-3 border-b">Last Name</th>
                <th class="px-4 py-3 border-b">Section</th>
                <th class="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in filteredStudents" :key="student._id" class="hover:bg-blue-50 transition-colors">
                <td class="px-4 py-2 border-b">{{ student.studentNumber }}</td>
                <td class="px-4 py-2 border-b capitalize">{{ student.firstName }}</td>
                <td class="px-4 py-2 border-b capitalize">{{ student.middleName || '-' }}</td>
                <td class="px-4 py-2 border-b capitalize">{{ student.lastName }}</td>
                <td class="px-4 py-2 border-b capitalize">{{ student.section || '-' }}</td>
                <td class="px-4 py-2 border-b text-center space-x-2">
                  <button @click="openEditModal(student._id)" class="text-blue-600 hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                    </svg>
                  </button>
                  <button @click="openDeleteModal(student._id)" class="text-red-600 hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        </div>
      </div>
      <div v-else class="text-gray-500 text-center py-10">
        No students found. Try uploading or searching again.
      </div>
    </div>

    <!-- Add Button -->
    <button
      v-if="!isPreviewMode"
      @click="openAddModal"
      class="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 transition-all hover:scale-105 focus:ring-4 focus:ring-blue-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <!-- Add Modal -->
    <transition name="pop">
      <div v-if="showAddModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Add New Student</h2>
          <div class="space-y-3">
            <div v-for="(label, key) in editableFields" :key="key">
              <label class="text-sm text-gray-600">{{ label }}</label>
              <input v-model="newStudent[key]" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button @click="closeAddModal" class="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button @click="saveNewStudent" class="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white">Add Student</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Edit Modal -->
    <transition name="pop">
      <div v-if="showEditModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Edit Student</h2>
          <div class="space-y-3">
            <div v-for="(label, key) in editableFields" :key="key">
              <label class="text-sm text-gray-600">{{ label }}</label>
              <input v-model="editForm[key]" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button @click="closeEditModal" class="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button @click="saveEdit" class="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white">Save Changes</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Delete Modal -->
    <transition name="pop">
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Delete Student</h2>
          <p class="text-sm text-gray-600 mb-4">
            Are you sure you want to delete
            <span class="font-semibold">{{ selectedStudent.firstName }} {{ selectedStudent.lastName }}</span>?
          </p>
          <div class="flex justify-center gap-3">
            <button @click="closeDeleteModal" class="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300">Cancel</button>
            <button @click="confirmDelete" class="px-4 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-700 text-white">Delete</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import * as XLSX from "xlsx";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";

const adminStore = useAdminStore();
const { enrolledStudent } = storeToRefs(adminStore);
const toast = useToast();

const previewStudents = ref([]);
const originalStudents = ref([]);
const isPreviewMode = ref(false);
const fileInput = ref(null);
const searchQuery = ref("");

onMounted(async () => {
  await adminStore.fetchEnrolledStudents();
});

// Excel Upload Preview
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = new Uint8Array(ev.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      originalStudents.value = [...enrolledStudent.value];
      previewStudents.value = jsonData.map((r) => ({
        _id: crypto.randomUUID(),
        studentNumber: r["student number"] || "",
        firstName: r["first name"] || "",
        middleName: r["middle name"] || "",
        lastName: r["last name"] || "",
        section: r["section"] || "",
      }));

      isPreviewMode.value = true;
      toast.success("Excel data loaded for preview!");
    } catch {
      toast.error("Failed to read Excel file.");
    } finally {
      e.target.value = null;
    }
  };
  reader.readAsArrayBuffer(file);
};

// Save / Cancel Preview
const savePreview = async () => {
  try {
    await adminStore.addEnrolledStudentExcel(previewStudents.value);
    isPreviewMode.value = false;
    previewStudents.value = [];
  } catch {
    toast.error("Failed to save data.");
  }
};

const cancelPreview = () => {
  previewStudents.value = [];
  isPreviewMode.value = false;
  if (fileInput.value) fileInput.value.value = null;
  toast.info("Preview canceled.");
};

// CRUD Modals
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedStudent = ref({});
const editForm = ref({});
const newStudent = ref({
  studentNumber: "",
  firstName: "",
  middleName: "",
  lastName: "",
  section: "",
});

const editableFields = {
  studentNumber: "Student Number",
  firstName: "First Name",
  middleName: "Middle Name",
  lastName: "Last Name",
  section: "Section",
};

// Add
const openAddModal = () => (showAddModal.value = true);
const closeAddModal = () => {
  showAddModal.value = false;
  newStudent.value = {
    studentNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    section: "",
  };
};

const saveNewStudent = async () => {
  const s = newStudent.value;
  if (!s.studentNumber || !s.firstName || !s.lastName) {
    return toast.error("Please fill all required fields.");
  }
  await adminStore.addEnrolledStudent(s);
  closeAddModal();
};

// Edit
const openEditModal = (id) => {
  const student = enrolledStudent.value.find((s) => s._id === id);
  if (!student) return;
  selectedStudent.value = student;
  editForm.value = { ...student };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editForm.value = {};
};

const saveEdit = async () => {
  await adminStore.updateEnrolledStudent(selectedStudent.value._id, editForm.value);
  closeEditModal();
};

// Delete
const openDeleteModal = (id) => {
  const student = enrolledStudent.value.find((s) => s._id === id);
  if (!student) return;
  selectedStudent.value = student;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedStudent.value = {};
};

const confirmDelete = async () => {
  await adminStore.deleteEnrolledStudent(selectedStudent.value._id);
  closeDeleteModal();
};

// Computed Filters
const displayStudents = computed(() => {
  return isPreviewMode.value ? previewStudents.value : enrolledStudent.value;
});

const filteredStudents = computed(() => {
  if (!searchQuery.value.trim()) return displayStudents.value;
  const q = searchQuery.value.toLowerCase();
  return displayStudents.value.filter((s) =>
    Object.values(s).join(" ").toLowerCase().includes(q)
  );
});

const studentsWithMiddleName = computed(
  () => displayStudents.value.filter((s) => s.middleName?.trim()).length
);

const studentsWithoutMiddleName = computed(
  () => displayStudents.value.filter((s) => !s.middleName?.trim()).length
);
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.25s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 9999px;
}
</style>