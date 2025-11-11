<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-2xl font-bold text-gray-900">
          Teacher Evaluation Result Dashboard
        </h1>
        <p class="text-sm text-gray-600 mt-1">
          Select a teacher to view detailed performance metrics
        </p>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <!-- Teacher Selector -->
      <section aria-labelledby="teacher-selector">
        <h2 id="teacher-selector" class="text-lg font-semibold text-gray-800 mb-3">
          Select Teacher
        </h2>

        <div class="flex gap-3 overflow-x-auto whitespace-nowrap pb-2 pt-1 pl-1">
          <button
            v-for="teacher in teachers"
            :key="teacher._id"
            @click="selectTeacher(teacher)"
            :aria-pressed="selectedTeacher?._id === teacher._id"
            class="min-w-[160px] text-center px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :class="[
              selectedTeacher?._id === teacher._id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ teacher.fullName }}
          </button>
        </div>
      </section>

      <!-- Evaluation Table -->
      <transition name="fade" mode="out-in">
        <section
          v-if="selectedTeacher"
          key="results"
          class="bg-white rounded-xl shadow-lg overflow-hidden"
          aria-labelledby="evaluation-title"
        >
          <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between py-4">
            <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-3">
              Evaluation Results — 
              <span v-if="selectedTeacher">{{ selectedTeacher.fullName }}</span>
            </h2>
          <button
            @click="exportToExcel"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex gap-2 items-center transition"
          >
            <i class="fas fa-file-excel"></i> Export Excel
          </button>
          </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

            <!-- Overall Score Card -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm">
              <h3 class="text-sm font-medium text-yellow-800">Overall Evaluation Score</h3>
              <p class="text-3xl font-bold text-yellow-900 mt-2">
                {{ overallAverage }}
              </p>
            </div>

            <!-- Total Evaluations Card -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
              <h3 class="text-sm font-medium text-blue-800">Total Evaluations</h3>
              <p class="text-3xl font-bold text-blue-900 mt-2">
                {{ teacherEvaluations.length }}
              </p>
            </div>

            <!-- Category Averages Card -->
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm">
              <h3 class="text-sm font-medium text-purple-800">Category Averages</h3>
              <ul class="text-sm mt-2 space-y-1">
                <li
                  v-for="(cat, i) in categories"
                  :key="i"
                  class="flex justify-between"
                >
                  <span class="font-medium text-gray-800">{{ cat.title }}:</span>
                  <span class="font-semibold">{{ calculateCategoryAverage(cat.items) }}</span>
                </li>
              </ul>
            </div>

          </div>

          <div id="evaluation-table" class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr>
                  <th class="text-left p-4 bg-gray-50 font-semibold text-gray-900 sticky left-0 z-10">
                    Row
                  </th>
                  <th
                    v-for="(category, idx) in categories"
                    :key="idx"
                    :colspan="category.items.length"
                    class="p-4 text-center font-semibold text-gray-800"
                    :class="category.color"
                  >
                    {{ category.title }}
                  </th>
                  <th class="text-left p-4 bg-gray-50 font-semibold text-gray-900 sticky right-0 z-10">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <!-- Criteria Row -->
              <tr>
                <td class="sticky left-0 z-10 bg-gray-50 font-medium p-4 text-center w-32 min-w-[8rem]"></td>
                <template v-for="cat in categories" :key="cat.title">
                  <td
                    v-for="item in cat.items"
                    :key="item.id"
                    class="p-3 text-xs text-center border-r border-gray-200 w-40 min-w-[7rem] break-words leading-tight"
                  >
                    <div class="font-semibold text-gray-900 text-sm">{{ item.id }}</div>
                    <div class="text-gray-600 text-[11px] mt-1">{{ item.text }}</div>
                  </td>
                </template>
                <td class="sticky right-0 z-10 bg-gray-50 font-medium text-center p-4 w-48 min-w-[12rem]">Comments</td>
              </tr>

              <!-- ✅ All Evaluation Actual Responses -->
              <tr
                v-for="(ev, index) in teacherEvaluations"
                :key="ev._id"
                class="odd:bg-blue-50"
              >
                <td class="p-4 font-semibold text-center sticky left-0 z-10 bg-white">
                  {{ index + 1 }}.
                </td>

                <template v-for="cat in categories" :key="cat.title">
                  <td
                    v-for="item in cat.items"
                    :key="item.id"
                    class="p-3 text-center font-bold"
                  >
                    {{ ev.answers[item.id] ?? '—' }}
                  </td>
                </template>
              <td 
                class="p-4 text-sm text-gray-700 sticky right-0 z-10 bg-white 
                      max-w-[12rem] min-w-[12rem] 
                      whitespace-normal break-words"
              >
                {{ ev.comment || 'No Comment' }}
              </td>
              </tr>
            </tbody>
            </table>
          </div>
        </section>

        <!-- Empty State -->
        <div
          v-else
          key="empty"
          class="text-center py-12 text-gray-500"
        >
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p class="mt-2 text-lg">Please select a teacher to view evaluation results.</p>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import * as XLSX from "xlsx";
import { storeToRefs } from "pinia";
import { useAdminStore } from '@/stores/AdminStore';

const adminStore = useAdminStore();
const { teachers, activeForm, evaluations } = storeToRefs(adminStore);

const selectedTeacher = ref(null);

// ✅ Filtered evaluations for selected teacher
const teacherEvaluations = computed(() => {
  if (!selectedTeacher.value) return [];
  return evaluations.value.filter(
    (ev) =>
      ev.teacher?.toLowerCase() ===
      selectedTeacher.value.fullName?.toLowerCase()
  );
});

// ✅ Categories with items from active form
const categories = computed(() => {
  if (!activeForm.value?.formData) return [];
  return activeForm.value.formData.map((cat) => ({
    title: cat.title,
    items: cat.questionsIds.map((q) => ({
      id: q.id,
      text: q.text
    }))
  }));
});

// ✅ Count total items for overall span
const totalItems = computed(() =>
  categories.value.reduce((sum, c) => sum + c.items.length, 0)
);

// ✅ Category average based only on filtered evaluations
const calculateCategoryAverage = (items) => {
  const scores = [];

  teacherEvaluations.value.forEach(ev => {
    items.forEach(item => {
      if (ev.answers[item.id] != null) {
        scores.push(ev.answers[item.id]);
      }
    });
  });

  return scores.length
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
    : "0.00";
};

// ✅ Overall average for teacher
const overallAverage = computed(() => {
  const allScores = [];

  teacherEvaluations.value.forEach(ev => {
    Object.values(ev.answers).forEach(score => {
      if (score != null) allScores.push(score);
    });
  });

  return allScores.length
    ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2)
    : "0.00";
});

// ✅ When a teacher button is clicked
const selectTeacher = (teacher) => {
  selectedTeacher.value = teacher;
};

// ✅ Fetch data from Pinia
onMounted(async () => {
  await adminStore.fetchTeachers();
  await adminStore.fetchActiveForm();
  await adminStore.fetchActiveEvaluations();
  if (teachers.value.length > 0) {
    selectTeacher(teachers.value[0]);
  }
});

const exportToExcel = () => {
  if (!selectedTeacher.value) return;

  // ✅ Dynamic question headers
  const questionHeaders = categories.value.flatMap(cat =>
    cat.items.map(item => item.id)
  );

  // ✅ Header: Row No. + Questions + Comment
  const header = ["#", ...questionHeaders, "Comment"];

  // ✅ Build rows based on teacher evaluations
  const rows = teacherEvaluations.value.map((ev, index) => {
    const answers = questionHeaders.map(q => ev.answers[q] ?? "—");
    return [
      index + 1, // Row index
      ...answers,
      ev.comment || "—"
    ];
  });

  // ✅ Compute average per question
  const averages = questionHeaders.map(q => {
    const scores = teacherEvaluations.value
      .map(ev => ev.answers[q])
      .filter(v => typeof v === "number");

    return scores.length
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
      : "0.00";
  });

  // ✅ Append averages row
  rows.push(["Averages", ...averages, ""]);

  // ✅ Append overall average row (1 number only)
  rows.push([
    "Overall Score",
    overallAverage.value,
    ...Array(questionHeaders.length - 1).fill(""),
    ""
  ]);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Evaluation Results");
  XLSX.writeFile(
    workbook,
    `Evaluation_${selectedTeacher.value.fullName.replace(/\s+/g, "_")}.xlsx`
  );
};
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>