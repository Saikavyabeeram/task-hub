<template>
  <div class="app">
    <h1>✅ MEVN Task Hub</h1>

    <div class="input-section">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Add a new task"
      />
      <button @click="addTask">Add</button>
    </div>

    <div v-if="isLoading">⏳ Loading tasks...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <span>{{ task.title }}</span>
        <button @click="deleteTask(task.id)">❌</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// State
const tasks = ref([])
const newTask = ref('')
const isLoading = ref(false)
const error = ref(null)

// Backend URL
const API_URL = 'http://localhost:5000/api/tasks'

// Load tasks on component mount
onMounted(() => {
  loadTasks()
})

// Load tasks from backend
const loadTasks = async () => {
  isLoading.value = true
  error.value = null
  try {
    const res = await axios.get(API_URL)
    tasks.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Error loading tasks'
  } finally {
    isLoading.value = false
  }
}

// Add a new task
const addTask = async () => {
  if (!newTask.value.trim()) return
  try {
    const res = await axios.post(API_URL, { title: newTask.value })
    tasks.value.push(res.data)
    newTask.value = ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Error adding task'
  }
}

// Delete a task
const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
    tasks.value = tasks.value.filter(task => task.id !== id)
  } catch (err) {
    error.value = err.response?.data?.message || 'Error deleting task'
  }
}
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.input-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  justify-content: space-between;
  background: #f5f5f5;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border-radius: 6px;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
