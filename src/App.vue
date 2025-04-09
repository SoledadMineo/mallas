<!-- src/App.vue -->
<template>
  <v-app>
    <v-main class="pa-4">
      <CalculadoraCosto />
    </v-main>
  </v-app>
</template>

<script setup>
import CalculadoraCosto from './components/CalculadoraCosto.vue'
</script>

<style scoped>
.v-main {
  max-width: 700px;
  margin: auto;
}
</style>
