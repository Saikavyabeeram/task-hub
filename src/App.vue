<template>
  <div class="app">
    <h1 class="text-center text-3xl font-bold mb-6">Task Hub</h1>

    <!-- Error Message -->
    <p v-if="error" class="text-red-600 mb-4 text-center">{{ error }}</p>

    <!-- Input form -->
    <input
      v-model="newTask"
      @keyup.enter="addTask"
      placeholder="Add a task"
      class="w-full p-3 mb-4 border border-gray-300 rounded-lg"
    />

    <!-- Filters -->
    <div class="filters mb-4 text-center">
      <button @click="filter = 'all'" class="filter-button">All</button>
      <button @click="filter = 'active'" class="filter-button">Active</button>
      <button @click="filter = 'done'" class="filter-button">Done</button>
    </div>

    <!-- Task List -->
    <ul class="task-list">
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <span :class="{ done: task.done }">{{ task.title }}</span>
        <div class="buttons">
          <button @click="toggleDone(task)" class="task-btn">✔️</button>
          <button @click="removeTask(task.id)" class="task-btn">🗑️</button>
        </div>
      </li>
    </ul>

    <!-- Clear Done Button -->
    <button class="clear-done-btn" @click="clearCompleted">Clear Done</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state variables
const newTask = ref('')
const tasks = ref([])
const filter = ref('all')
const error = ref('')

// Filtered tasks based on the selected filter
const filteredTasks = computed(() => {
  if (filter.value === 'active') return tasks.value.filter(t => !t.done)
  if (filter.value === 'done') return tasks.value.filter(t => t.done)
  return tasks.value
})

// Add a task
const addTask = () => {
  if (!newTask.value.trim()) {
    showError('Task cannot be empty')
    return
  }

  tasks.value.push({
    id: Date.now(),
    title: newTask.value,
    done: false
  })

  newTask.value = ''
}

// Remove a task
const removeTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

// Toggle task done status
const toggleDone = (task) => {
  task.done = !task.done
}

// Clear all completed tasks
const clearCompleted = () => {
  tasks.value = tasks.value.filter(task => !task.done)
}

// Show error message for a limited time
const showError = (msg) => {
  error.value = msg
  setTimeout(() => {
    error.value = ''
  }, 2000)
}
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h1 {
  text-align: center;
  color: #4A4A4A;
}

input {
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4caf50;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 1rem;
}

.filter-button:hover {
  background-color: #f4f4f4;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  background: #fff;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-item span {
  flex-grow: 1;
}

.task-btn {
  margin-left: 0.5rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.done {
  text-decoration: line-through;
  color: green;
}

.clear-done-btn {
  margin-top: 1rem;
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
}

.clear-done-btn:hover {
  background: #dc2626;
}

@media (max-width: 600px) {
  .app {
    padding: 1rem;
  }

  input {
    font-size: 1rem;
  }

  .task-btn {
    font-size: 1rem;
  }

  .filter-button {
    padding: 0.5rem;
    font-size: 1rem;
  }
}
</style>
