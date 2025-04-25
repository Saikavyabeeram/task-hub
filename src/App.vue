<template>
  <div class="app">
    <h1>Task Hub</h1>
    <!-- Input form -->
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a task" />

    <!-- Task list -->
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ done: task.done }">{{ task.title }}</span>
        <button @click="toggleDone(task)">✔️</button>
        <button @click="removeTask(task.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// Define reactive values
const newTask = ref('')
const tasks = ref([])

// Function to add a task
const addTask = () => {
  if (!newTask.value.trim()) return

  tasks.value.push({
    id: Date.now(),
    title: newTask.value,
    done: false
  })

  newTask.value = ''
}

// Function to remove a task
const removeTask = (id) => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

// Function to toggle done
const toggleDone = (task) => {
  task.done = !task.done
}
</script>

<style>
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
