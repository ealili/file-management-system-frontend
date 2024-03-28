import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    // Redirect to dashboard if logged in
    if (to.path === '/login' && isAuthenticated) {
      next('/dashboard')
    } else {
      next()
    }
  }
})

const app = createApp(App)

app.use(router)

app.mount('#app')
