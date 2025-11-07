import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
  timeout: 1000
});


app.mount('#app')

