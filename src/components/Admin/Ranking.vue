<template>
  <div class="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 tracking-tight">Teacher Rankings</h2>
      <span class="text-sm text-gray-500">{{ rankedTeachers.length }} total</span>
    </div>

    <!-- Rankings -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Full-Time Rankings -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
          Full-Time Teachers
        </h3>

        <div v-if="fullTimeTeachers.length" class="flex flex-col divide-y divide-gray-100">
          <div
            v-for="(teacher, index) in fullTimeTeachers"
            :key="teacher.fullName"
            class="flex items-center justify-between py-4 px-3 rounded-xl group hover:bg-gray-50 transition-all duration-200"
          >
            <!-- Left: Rank + Info -->
            <div class="flex items-center gap-5">
              <!-- Rank Circle -->
              <div
                :class="[
                  'flex items-center justify-center w-10 h-10 text-sm font-bold rounded-full shadow-sm relative',
                  getRankColor(index),
                  'group-hover:scale-105 transition-transform duration-200'
                ]"
              >
                {{ index + 1 }}
                <div
                  v-if="index < 3"
                  class="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform duration-200"
                >
                  <component
                    :is="getTrophyIcon(index)"
                    class="w-4 h-4"
                    :class="getTrophyColor(index)"
                  />
                </div>
              </div>

              <!-- Info -->
              <div>
                <p class="text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                  {{ teacher.fullName }}
                </p>
                <div class="relative w-40 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <div
                    class="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                    :class="getBarColor(index)"
                    :style="{ width: (teacher.rating / 5) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Right -->
            <div class="flex items-center gap-5">
              <div class="text-right leading-tight">
                <p class="text-lg font-semibold text-gray-900">
                  {{ teacher.rating.toFixed(1) }}
                  <span class="text-gray-400 text-sm">/5</span>
                </p>
                <p class="text-xs text-gray-500">{{ teacher.evaluationCount }} evaluations</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-400 text-sm text-center py-6">No full-time teachers yet.</div>
      </div>

      <!-- Part-Time Rankings -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          Part-Time Teachers
        </h3>

        <div v-if="partTimeTeachers.length" class="flex flex-col divide-y divide-gray-100">
          <div
            v-for="(teacher, index) in partTimeTeachers"
            :key="teacher.fullName"
            class="flex items-center justify-between py-4 px-3 rounded-xl group hover:bg-gray-50 transition-all duration-200"
          >
            <!-- Left: Rank + Info -->
            <div class="flex items-center gap-5">
              <div
                :class="[
                  'flex items-center justify-center w-10 h-10 text-sm font-bold rounded-full shadow-sm relative',
                  getRankColor(index),
                  'group-hover:scale-105 transition-transform duration-200'
                ]"
              >
                {{ index + 1 }}
                <div
                  v-if="index < 3"
                  class="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform duration-200"
                >
                  <component
                    :is="getTrophyIcon(index)"
                    class="w-4 h-4"
                    :class="getTrophyColor(index)"
                  />
                </div>
              </div>

              <div>
                <p class="text-gray-900 font-medium group-hover:text-green-700 transition-colors">
                  {{ teacher.fullName }}
                </p>
                <div class="relative w-40 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                  <div
                    class="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                    :class="getBarColor(index)"
                    :style="{ width: (teacher.rating / 5) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Right -->
            <div class="flex items-center gap-5">
              <div class="text-right leading-tight">
                <p class="text-lg font-semibold text-gray-900">
                  {{ teacher.rating.toFixed(1) }}
                  <span class="text-gray-400 text-sm">/5</span>
                </p>
                <p class="text-xs text-gray-500">{{ teacher.evaluationCount }} evaluations</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-400 text-sm text-center py-6">No part-time teachers yet.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Trophy, Medal, Award } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useAdminStore } from '@/stores/AdminStore'

const adminStore = useAdminStore()
const { teachers, evaluations } = storeToRefs(adminStore)

onMounted(async () => {
  await adminStore.fetchTeachers()
  await adminStore.fetchActiveEvaluations()
})

// 🧮 Compute each teacher’s average rating and total evaluations
const rankedTeachers = computed(() => {
  if (!teachers.value.length || !evaluations.value.length) return []

  return teachers.value.map((teacher) => {
    const teacherEvals = evaluations.value.filter(
      (e) => e.teacher.trim().toLowerCase() === teacher.fullName.trim().toLowerCase()
    )

    if (!teacherEvals.length) {
      return { ...teacher, rating: 0, evaluationCount: 0 }
    }

    // Compute average of all answer scores per evaluation
    const totalScore = teacherEvals.reduce((acc, ev) => {
      const answers = Object.values(ev.answers || {})
      const sum = answers.reduce((a, b) => a + b, 0)
      const avg = sum / answers.length
      return acc + avg
    }, 0)

    const overallRating = totalScore / teacherEvals.length

    return {
      ...teacher,
      rating: overallRating,
      evaluationCount: teacherEvals.length,
    }
  })
})

// Separate full-time and part-time teachers
const fullTimeTeachers = computed(() =>
  rankedTeachers.value
    .filter((t) => t.employmentType === 'Full-Time')
    .sort((a, b) => b.rating - a.rating)
)
const partTimeTeachers = computed(() =>
  rankedTeachers.value
    .filter((t) => t.employmentType === 'Part-Time')
    .sort((a, b) => b.rating - a.rating)
)

// 🎨 UI Helpers
const getRankColor = (index) => {
  switch (index) {
    case 0:
      return 'bg-gradient-to-br from-amber-300 to-yellow-400 text-amber-900'
    case 1:
      return 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800'
    case 2:
      return 'bg-gradient-to-br from-orange-200 to-orange-300 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const getBarColor = (index) => {
  switch (index) {
    case 0:
      return 'bg-gradient-to-r from-amber-400 to-yellow-500'
    case 1:
      return 'bg-gradient-to-r from-gray-300 to-gray-400'
    case 2:
      return 'bg-gradient-to-r from-orange-300 to-orange-400'
    default:
      return 'bg-blue-200'
  }
}

const getTrophyIcon = (index) => {
  switch (index) {
    case 0:
      return Trophy
    case 1:
      return Medal
    case 2:
      return Award
    default:
      return null
  }
}

const getTrophyColor = (index) => {
  switch (index) {
    case 0:
      return 'text-amber-500'
    case 1:
      return 'text-gray-400'
    case 2:
      return 'text-orange-400'
    default:
      return ''
  }
}
</script>

<style scoped>
div[v-for] {
  transition: transform 0.2s ease, background 0.2s ease;
}
</style>
