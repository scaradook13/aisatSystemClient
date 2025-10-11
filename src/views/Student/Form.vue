<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="px-4 py-4">
        <h1 class="text-lg font-semibold text-gray-900 text-center">
          AISAT Faculty Teacher Evaluation
        </h1>
        <div class="mt-2 flex justify-center gap-2">
          <div
            v-for="page in 4"
            :key="page"
            class="h-1 w-12 rounded-full transition-colors"
            :class="page - 1 === currentPage ? 'bg-blue-600' : 'bg-gray-200'"
          ></div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 py-6 max-w-2xl mx-auto">
      <!-- Instructor and Section (Only on first page) -->
      <template v-if="currentPage === 0">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User class="w-4 h-4 mr-2 text-gray-500" />
            Instructor
          </label>
          <select
            v-model="instructor"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          >
          <option disabled value="">Select Instructor</option>
            <option v-for="inst in filteredInstructors" :key="inst.name" :value="inst.name">{{ inst.name }}</option>
          </select>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
            <BookOpen class="w-4 h-4 mr-2 text-gray-500" />
            Section
          </label>
          <input
            type="text"
            disabled
            v-model="userStore.section"
            placeholder="Enter section"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>
      </template>

      <!-- Category Section -->
      <div class="mb-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold text-gray-900">{{ currentCategory.title }}</h2>
          <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Score: 1-5
          </span>
        </div>

        <!-- Questions -->
        <div class="space-y-3">
          <div
            v-for="(question, index) in currentCategory.questions"
            :key="question.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <p class="text-sm text-gray-700 mb-3">
              <span class="font-medium text-gray-900">
                {{ currentPage + 1 }}.{{ index + 1 }}
              </span>
              {{ question.text }}
            </p>

            <!-- Rating Buttons -->
            <div class="flex gap-2">
              <button
                v-for="rating in [1, 2, 3, 4, 5]"
                :key="rating"
                @click="handleRatingChange(question.id, rating)"
                class="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                :class="ratings[question.id] === rating
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              >
                {{ rating }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comments (Only on last page) -->
      <div
        v-if="currentPage === 3"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
      >
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Comments (Optional)
        </label>
        <textarea
          v-model="comments"
          placeholder="Comments Here..."
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
        ></textarea>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex gap-3">
        <button
          v-if="currentPage > 0"
          @click="handleBack"
          class="flex-1 py-3 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
        >
          <ChevronLeft class="w-5 h-5" />
          Back
        </button>

        <button
          v-if="currentPage < 3"
          @click="handleNext"
          :disabled="!isPageValid"
          class="flex-1 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all"
          :class="isPageValid
            ? 'bg-blue-600 hover:bg-blue-700 shadow-sm'
            : 'bg-gray-300 cursor-not-allowed'"
        >
          Next
          <ChevronRight class="w-5 h-5" />
        </button>

        <button
          v-else
          @click="handleSubmit"
          :disabled="!isPageValid"
          class="flex-1 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all"
          :class="isPageValid
            ? 'bg-blue-600 hover:bg-blue-700 shadow-sm'
            : 'bg-gray-300 cursor-not-allowed'"
        >
          <Send class="w-5 h-5" />
          Submit
        </button>
      </div>

      <!-- Validation Message -->
      <p v-if="!isPageValid" class="text-center text-sm text-gray-500 mt-3">
        Please complete all fields to continue
      </p>
    </div>
  </div>
</template>

<script setup>
import { ChevronRight, ChevronLeft, User, BookOpen, Send } from 'lucide-vue-next'
import { useStudentFormStore } from '@/stores/StudentForm'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/User'
const userStore = useUserStore()
const StudentFormStore = useStudentFormStore()

// state refs
const {
  currentPage,
  currentCategory,
  instructors,
  instructor,
  ratings,
  comments,
  isPageValid,
  filteredInstructors
} = storeToRefs(StudentFormStore)

// actions
const {
  handleRatingChange,
  handleNext,
  handleBack,
  handleSubmit,
} = StudentFormStore
</script>
