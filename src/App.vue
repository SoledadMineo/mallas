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
  width: 1000px;
  margin: auto;
}

</style>
