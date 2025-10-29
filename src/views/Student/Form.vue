<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800">Faculty Evaluation</h1>
        <p class="text-gray-500 mt-1">
          {{ activeForm.formDate || "Academic Year 2025–2026 | 1st Semester" }}
        </p>
      </div>

      <!-- Quick Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Section Card -->
        <div
          class="p-5 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md flex justify-between items-center"
        >
          <div>
            <p class="text-sm opacity-90">Your Section</p>
            <h2 class="text-2xl font-semibold mt-1">{{ section || "N/A" }}</h2>
          </div>
          <div class="bg-white/20 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c0 3.866-3.582 7-8 7 4.418 0 8-3.134 8-7zm0 0c0-3.866 3.582-7 8-7-4.418 0-8 3.134-8 7z"
              />
            </svg>
          </div>
        </div>

        <!-- Progress Card -->
        <div
          class="p-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
        >
          <div class="flex justify-between items-center mb-1">
            <p class="text-sm opacity-90">Progress</p>
            <span class="text-sm font-medium">
              {{ ((completed / total) * 100).toFixed(0) || 0 }}%
            </span>
          </div>
          <h2 class="text-2xl font-semibold mb-2">{{ completed }}/{{ total }}</h2>
          <div class="w-full bg-white/30 rounded-full h-2 overflow-hidden">
            <div
              class="bg-white h-2 rounded-full transition-all duration-500"
              :style="{ width: `${(completed / total) * 100 || 0}%` }"
            ></div>
          </div>
        </div>

        <!-- Teachers Card -->
        <div
          class="p-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md flex justify-between items-center"
        >
          <div>
            <p class="text-sm opacity-90">Available Teachers</p>
            <h2 class="text-2xl font-semibold mt-1">
              {{ filteredInstructors.length }}
            </h2>
          </div>
          <div class="bg-white/20 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.305.5 6.121 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Teacher Selection -->
      <div class="bg-white p-6 rounded-2xl shadow-sm">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Select Teacher to Evaluate
        </label>
        <select
          v-model="selectedTeacher"
          class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled selected>Choose an instructor...</option>
          <option
            v-for="teacher in filteredInstructors"
            :key="teacher._id"
            :value="teacher.fullName"
          >
            {{ teacher.fullName }}
          </option>
        </select>
      </div>

      <!-- Empty State if no teacher selected -->
      <div
        v-if="!selectedTeacher"
        class="bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center p-16 text-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-14 w-14 mb-3 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.305.5 6.121 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p>Select a teacher above to begin the evaluation</p>
      </div>

      <!-- Evaluation Form -->
      <div
        v-else
        v-for="(category, index) in activeForm.formData"
        :key="category._id"
        class="bg-white p-6 rounded-2xl shadow-sm space-y-5"
      >
        <h2 class="text-xl font-semibold text-blue-700 flex items-center">
          <span
            class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mr-2"
            >{{ index + 1 }}</span
          >
          {{ category.title }}
        </h2>

        <div
          v-for="question in category.questionsIds"
          :key="question._id"
          class="border border-gray-100 rounded-xl p-4 hover:shadow-md transition mb-4"
          >
          <p class="font-medium text-gray-800 mb-3">{{ question.id }}. {{ question.text }}</p>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="rating in [1, 2, 3, 4, 5]"
              :key="rating"
              type="button"
              @click="userStore.setRating(question.id, rating)"
              :class="[
                'py-2 text-sm rounded-lg border transition',
                ratings[question.id] === rating
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:bg-blue-50'
              ]"
            >
              {{ rating }}
            </button>
          </div>
        </div>
      </div>

      <!-- Comments -->
      <div v-if="selectedTeacher" class="bg-white p-6 rounded-2xl shadow-sm">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Additional Feedback (Optional)</label
        >
        <textarea
        v-model="comment"
          rows="4"
          class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your feedback or suggestions..."
        ></textarea>
      </div>

      <!-- Submit -->
      <div v-if="selectedTeacher" class="text-center pt-4">
        <button 
        @click="addEvaluationHandler()"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl shadow-md transition"
        >
          Submit Evaluation
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";

const adminStore = useAdminStore();
const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(() => {
  adminStore.fetchActiveForm();
  adminStore.fetchTeachers();
});

const { activeForm } = storeToRefs(adminStore);
const { section } = storeToRefs(authStore);
const { selectedTeacher, ratings, comment  } = storeToRefs(userStore);

const instructors = computed(() =>
  Array.isArray(adminStore.teachers)
    ? adminStore.teachers
    : adminStore.teachers?.value || []
);

const filteredInstructors = computed(() => {
  if (!section.value) return instructors.value;
  return instructors.value.filter(
    (t) =>
      Array.isArray(t.handleSections) && t.handleSections.includes(section.value)
  );
});


const completed = ref(0);
const total = ref(7);


// const setRating = (questionId, rating) => {
//   ratings.value[questionId] = rating;
//   console.log(ratings.value)
// };

const addEvaluationHandler = () =>{
  userStore.addEvaluation()
}
</script>
