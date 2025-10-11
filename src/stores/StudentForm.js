import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/User.js'


export const useStudentFormStore = defineStore('StudentForm', () => {
    const userStore = useUserStore()
    // State
const currentPage = ref(0)
const instructor = ref('')
const section = ref(userStore.section)
const comments = ref('')
const ratings = reactive({
  q1_1: '', q1_2: '', q1_3: '', q1_4: '', q1_5: '', q1_6: '',
  q2_1: '', q2_2: '', q2_3: '', q2_4: '',
  q3_1: '', q3_2: '', q3_3: '', q3_4: '',
  q4_1: '', q4_2: '', q4_3: '', q4_4: '', q4_5: '', q4_6: ''
})
    

const categories = [
  {
    title: 'I. Teaching Competence',
    questions: [
      { id: 'q1_1', text: 'Analyzes and elaborates lesson without reading the textbook in class' },
      { id: 'q1_2', text: 'Uses audio-visual aid and devices to support and facilitate instruction' },
      { id: 'q1_3', text: 'Presents facts and concepts clearly and convincingly from related fields and integrates subject matter with actual experience and day-to-day activities' },
      { id: 'q1_4', text: 'Makes the students apply concepts to demonstrate understanding of the lesson' },
      { id: 'q1_5', text: 'Gives fair test and examination and returns test results within reasonable period' },
      { id: 'q1_6', text: 'Shows good command of the language of instruction' }
    ]
  },
  {
    title: 'II. Management Skills',
    questions: [
      { id: 'q2_1', text: 'Maintains a responsive, safe, and disciplined classroom atmosphere that is conducive to learning' },
      { id: 'q2_2', text: 'Follows systematic schedule of classes and school activities' },
      { id: 'q2_3', text: "Stimulates student's respect and regard for the teacher" },
      { id: 'q2_4', text: 'Allows students to express their opinions and their views' }
    ]
  },
  {
    title: 'III. Guidance Skills',
    questions: [
      { id: 'q3_1', text: 'Accepts students as they are by recognizing their strengths and weaknesses as individuals' },
      { id: 'q3_2', text: 'Inspires the students to be self-reliant and self-disciplined' },
      { id: 'q3_3', text: "Handles class and students' problems with fairness and understanding" },
      { id: 'q3_4', text: 'Shows genuine concern for the personal and other problems presented by the students outside classroom activities' }
    ]
  },
  {
    title: 'IV. Personal and Social Qualities',
    questions: [
      { id: 'q4_1', text: 'Maintains emotional balance, not over-critical or over sensitive' },
      { id: 'q4_2', text: 'Is free from mannerisms that distract the teaching and learning process' },
      { id: 'q4_3', text: 'Is well-groomed, clothes clean and neat. (Uses appropriate clothes becoming a teacher)' },
      { id: 'q4_4', text: 'Is fair and impartial to all students. Shows no favoritism' },
      { id: 'q4_5', text: 'Has good sense of humor and shows enthusiasm in teaching' },
      { id: 'q4_6', text: 'Has good diction, clear and modulated voice' }
    ]
  }
]

const instructors = ref([
  { name: 'Prof. John Smith', section: 'GC1MA' },
  { name: 'Dr. Maria Garcia', section: 'GC1MA' },
  { name: 'Prof. Robert Chen', section: 'BSECE 4A' },
  { name: 'Dr. Sarah Johnson', section: 'BSIT 1C' }
])

// Handlers
const handleRatingChange = (questionId, value) => {
  ratings[questionId] = value
}

const handleNext = () => {
  if (currentPage.value < 3) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleBack = () => {
  if (currentPage.value > 0) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleSubmit = () => {
    const userStore = useUserStore()
    console.log('Form submitted:', {
    instructor: instructor.value,
    section: userStore.section,
    ratings: { ...ratings },
    comments: comments.value
  })
  alert('Evaluation submitted successfully!')
}

// Validation
const isPageValid = computed(() => {
  const currentCategory = categories[currentPage.value]
  const requiredQuestions = currentCategory.questions.map(q => q.id)
  const allAnswered = requiredQuestions.every(qId => ratings[qId] !== '')

  // Page 0 needs instructor + section + allAnswered
  if (currentPage.value === 0) {
    return (
      instructor.value.trim() !== '' &&
      section.value.trim() !== '' &&
      allAnswered
    )
  }

  // Other pages only need allAnswered
  return allAnswered
})

const currentCategory = computed(() => categories[currentPage.value])

const filteredInstructors = computed(() => {
  if (!section.value) return instructors.value
  return instructors.value.filter(inst => inst.section === section.value)
})

  return { 
    currentPage,
    instructor,
    section,
    comments,
    ratings,
    categories,
    instructors,
    handleRatingChange,
    handleNext,
    handleBack,
    handleSubmit,
    isPageValid,
    currentCategory,
    filteredInstructors
   }
})
