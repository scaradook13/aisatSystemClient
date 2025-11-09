<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
    <div class="max-w-5xl mx-auto space-y-8">
    <!-- Header -->
    <header
      class="relative flex items-center justify-between w-full flex-wrap p-4"
    >
      <!-- Title -->
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-xl md:text-2xl font-bold text-gray-800 leading-tight">
          AISAT Faculty Evaluation
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          {{ activeForm.formDate || "Academic Year 2025–2026 | 1st Semester" }}
        </p>
      </div>

      <!-- Logout Button -->
      <div class="mt-3 md:mt-0 flex justify-center md:justify-end flex-shrink-0">
        <button
          @click="handleLogout"
          class="flex items-center gap-2 bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-all rounded-lg px-3 py-2 shadow-sm text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          <span class="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-heart-icon lucide-house-heart"><path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
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
              {{ availableTeachers.length }}
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
          v-for="teacher in availableTeachers"
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
          <p
            v-if="!ratings[question.id] && isSubmitting"
            class="text-red-500 text-sm mt-1"
          >
            * Required
          </p>
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
        <!-- Validation message -->
          <p
            v-if="!ratings[question.id] && showValidationErrors"
            class="text-red-500 text-sm mt-2"
          >
            * Required
          </p>
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
          @click="addEvaluationHandler"
          :disabled="isSubmitting"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="!isSubmitting">Submit Evaluation</span>
          <span v-else>Submitting...</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Success Modal -->
<transition name="fade">
  <div
    v-if="showSuccessModal"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div
      class="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full"
    >
      <div
        class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-10 h-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
      <p class="text-gray-500 mb-6">
        Your evaluation has been submitted successfully.<br />
        Your feedback helps us improve our teaching quality.
      </p>
      <button
        @click="handleSubmitAnother"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
      >
        Submit Another
      </button>
    </div>
  </div>
</transition>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import { useToast } from "vue-toastification";
const toast = useToast();

const adminStore = useAdminStore();
const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(async () => {
  await adminStore.fetchActiveForm();
  await adminStore.fetchTeachers();
  await userStore.fetchStudentInfo()
})


const { activeForm } = storeToRefs(adminStore);
const { section } = storeToRefs(authStore);
const { selectedTeacher, ratings, comment, teacherEvaluated } = storeToRefs(userStore);

// --- Instructor filtering ---
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

const availableTeachers = computed(() => {
  // Ensure data exists before filtering
  if (!filteredInstructors.value?.length) return [];

  return filteredInstructors.value.filter(
    (teacher) =>
      !teacherEvaluated.value?.includes(teacher.fullName)
  );
});

// --- State for progress + submission ---
const completed = computed(() => teacherEvaluated.value?.length || 0);
const total = computed(() => filteredInstructors.value.length)
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const showValidationErrors = ref(false)



// ✅ Validate that every question has a rating before submitting
const isFormValid = computed(() => {
  if (!activeForm.value || !activeForm.value.formData) return false

  const allQuestions = activeForm.value.formData.flatMap(
    (cat) => cat.questionsIds || []
  )

  // Every question must have a rating
  return allQuestions.every((q) => ratings.value[q.id])
})


const addEvaluationHandler = async () => {
  if (isSubmitting.value) return

  showValidationErrors.value = true // show missing question messages

  // 🧩 Validation + auto-scroll to first unanswered
  if (!isFormValid.value) {
    const firstUnanswered = document.querySelector(".border-gray-100:not(:has(.bg-blue-500))")
    if (firstUnanswered)
      firstUnanswered.scrollIntoView({ behavior: "smooth", block: "center" })
    toast.error("Please rate all questions before submitting.")
    return
  }

  try {
    isSubmitting.value = true
    await userStore.addEvaluation() // your API call
    showSuccessModal.value = true
    showValidationErrors.value = false // reset validation after success
  } catch (err) {
    console.error("Error submitting evaluation:", err)
    toast.error("Something went wrong. Please try again.")
  } finally {
    isSubmitting.value = false
  }
}

// --- Close Success Modal ---
const handleSubmitAnother = async () => {
  selectedTeacher.value = ''
  ratings.value = {}
  comment.value = ''
  await adminStore.fetchActiveForm();
  await adminStore.fetchTeachers();
  await userStore.fetchStudentInfo()
  showSuccessModal.value = false;
};

const handleLogout = async () => {
  try {
    await authStore.logout()
    toast.success("Logged out successfully.")
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  } catch (err) {
    console.error(err)
    toast.error("Logout failed.")
  }
}

</script>

