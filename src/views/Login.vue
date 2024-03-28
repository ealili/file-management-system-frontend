<template>
  <div>
    <input style="padding: 8px" v-model="email" type="email" placeholder="Email" />
    <br />
    <input
      style="padding: 8px; margin-top: 8px"
      v-model="password"
      type="password"
      placeholder="Password"
    />
    <br />
    <button @click="login" style="padding: 5px 15px; margin: 10px 0">Login</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
          emailAddress: this.email,
          password: this.password
        })
        const { token } = response.data
        localStorage.setItem('token', token)
        this.$router.replace('/dashboard')
      } catch (error) {
        console.error('Login failed:', error)
      }
    }
  }
}
</script>
