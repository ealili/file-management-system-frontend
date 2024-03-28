<template>
  <div>
    <h1>Dashboard</h1>
    <table class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>File Name</th>
          <th>File Pages</th>
          <th>Creation Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.id">
          <td>{{ file.id }}</td>
          <td>{{ file.fileName }}</td>
          <td>{{ file.filePages }}</td>
          <td>{{ formatDate(file.creationDate) }}</td>
          <td>
            <select v-model="file.status" @change="updateStatus(file)">
              <option value="Imported">Imported</option>
              <option value="Moved">Moved</option>
              <option value="Processed">Processed</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      files: []
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/files`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.files = response.data
    } catch (error) {
      console.error('Failed to fetch files:', error)
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString() // Format date as per user's locale
    },
    async updateStatus(file) {
      try {
        const token = localStorage.getItem('token')
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/files/${file.id}`,
          {
            status: file.status
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        console.log('Status updated successfully')
      } catch (error) {
        console.error('Failed to update status:', error)
      }
    }
  }
}
</script>

<style>
.custom-table {
  border-collapse: collapse;
  width: 100%;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.custom-table th {
  font-weight: 900;
}
</style>
