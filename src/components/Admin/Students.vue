<template>
  <div class="p-6">
    <!-- Add Student Button -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        <input
          v-model="search"
          type="text"
          placeholder="Search student..."
          class="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <div class="ml-[-50px]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></div>
      </div>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        <span>＋</span> Add Student
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white shadow rounded-md overflow-hidden">
      <table class="min-w-full border-collapse">
        <thead class="bg-gray-100 text-left text-gray-600 uppercase text-sm">
          <tr>
            <th class="px-6 py-3">Student Number</th>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Section</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="student in filteredStudents"
            :key="student.number"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-6 py-3 font-semibold">{{ student.number }}</td>
            <td class="px-6 py-3">{{ student.name }}</td>
            <td class="px-6 py-3">{{ student.section }}</td>
            <td class="px-6 py-3 flex items-center gap-1.5">
              <button>
                <SquarePen class="text-blue-600 w-4 h-4"/>
              </button>
              <button>
                <Trash2 class="text-red-600 w-4 h-4"/>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Trash2,SquarePen  } from 'lucide-vue-next'
const search = ref("");
const students = ref([
  { number: "20210001", name: "John Doe", section: "CS-401" },
  { number: "20210002", name: "Jane Smith", section: "MATH-301" },
  { number: "20210003", name: "Mike Wilson", section: "ENG-201" },
]);

const filteredStudents = computed(() => {
  return students.value.filter((s) =>
    s.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<style scoped>
table {
  width: 100%;
}
</style>
