<template>
  <header>
    <nav>
      <template v-if="!isLoggedIn">
        <RouterLink to="/login">Login</RouterLink>
      </template>
      <template v-else>
        <button @click="logout" style="padding: 5px 15px; margin-bottom: 10px">Logout</button>
        <br />
        <RouterLink to="/dashboard">Dashboard</RouterLink>
      </template>
    </nav>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      isLoggedIn: localStorage.getItem('token') !== null
    }
  },
  watch: {
    // Watch for changes in localStorage and update isLoggedIn accordingly
    $route() {
      this.isLoggedIn = localStorage.getItem('token') !== null
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      const router = this.$router
      router.replace({ path: '/login' })
    }
  },
  components: {
    RouterLink
  }
}
</script>
