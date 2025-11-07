<template>
  <div class="space-y-6">

    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900 tracking-tight">
        Dashboard Overview
      </h2>
      <p class="text-sm text-gray-500 mt-1">
        Latest performance insights at a glance
      </p>
    </div>

    <!-- ✅ Active Form Information -->
    <div
      v-if="activeForm?.formDate"
      class="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3"
    >
      <div class="p-2 rounded-md bg-blue-600 text-white flex items-center justify-center">
        <!-- 📝 Form Icon -->
        <svg xmlns="http://www.w3.org/2000/svg"
             class="h-5 w-5"
             fill="none" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h3l2 2h7a2 2 0 012 2v10a2 2 0 01-2 2z" />
        </svg>
      </div>

      <div>
        <p class="text-sm font-medium text-blue-800">Currently Active Form</p>
        <p class="text-lg font-semibold text-blue-900">
          {{ activeForm.formDate }}
        </p>
      </div>
    </div>

    <!-- ✅ Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="card in cards"
        :key="card.title"
        class="group bg-white p-6 rounded-2xl border border-gray-100 
               shadow-sm hover:shadow-md transition-all duration-300
               cursor-pointer relative overflow-hidden"
      >
        <!-- Accent Bubble -->
        <div
          class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 
                 transition-all duration-300 group-hover:opacity-20"
          :class="card.color"
        ></div>

        <div class="relative">
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium text-gray-600">
              {{ card.title }}
            </p>

            <component
              :is="card.icon"
              class="w-6 h-6"
              :class="card.iconColor"
            />
          </div>

          <p class="text-3xl font-semibold text-gray-900">
            {{ card.value }}
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { Users, GraduationCap, BookOpen, FileText } from 'lucide-vue-next'
import { storeToRefs } from "pinia";
import { useAdminStore } from '@/stores/AdminStore';

const adminStore = useAdminStore();
const { teachers, students, sections, evaluations, enrolledStudent, activeForm} =
  storeToRefs(adminStore);

onMounted(async () => {
  await Promise.all([
    adminStore.fetchTeachers(),
    adminStore.fetchSections(),
    adminStore.fetchStudents(),
    adminStore.fetchEnrolledStudents(),
    adminStore.fetchActiveForm(),
    adminStore.fetchActiveEvaluations()
  ]);
});

// ✅ Cards reactive + enrolled student added
const cards = computed(() => [
  {
    title: 'Total Teachers',
    value: teachers.value.length,
    icon: Users,
    color: 'bg-blue-600',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Total Enrolled Students',
    value: enrolledStudent.value.length,
    icon: GraduationCap,
    color: 'bg-green-600',
    iconColor: 'text-green-600'
  },
  {
    title: 'Total Registered Students',
    value: students.value.length,
    icon: GraduationCap,
    color: 'bg-emerald-600',
    iconColor: 'text-emerald-600'
  },
  {
    title: 'Total Sections',
    value: sections.value.length,
    icon: BookOpen,
    color: 'bg-purple-600',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Evaluations Submitted',
    value: evaluations.value.length,
    icon: FileText,
    color: 'bg-orange-600',
    iconColor: 'text-orange-600'
  }
]);
</script>

