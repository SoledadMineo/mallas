<!-- src/components/CalculadoraCosto.vue -->
<template>
    <v-card class="pa-4" elevation="5">
      <v-card-title>Calculadora de costo/ganancia para Mallas</v-card-title>
  
      <v-row>
        <v-col cols="6">
          <v-text-field v-model.number="alto" label="Alto (mm)" type="number" />
        </v-col>
        <v-col cols="6">
          <v-text-field v-model.number="ancho" label="Ancho (mm)" type="number" />
        </v-col>
      </v-row>
  
      <v-select v-model="paleta" :items="['SI', 'NO']" label="¿Tiene paleta?" />
      <v-select v-model="z16" :items="['SI', 'NO']" label="¿Tiene piñones Z16?" />
      <v-text-field v-if="z16 === 'SI'" v-model.number="cantZ16" label="Cantidad Z16" type="number" />
  
      <v-select v-model="z6" :items="['SI', 'NO']" label="¿Tiene piñones Z6?" />
      <v-text-field v-if="z6 === 'SI'" v-model.number="cantZ6" label="Cantidad Z6" type="number" />
  
      <v-select v-model="z10" :items="['SI', 'NO']" label="¿Tiene piñones Z10?" />
      <v-text-field v-if="z10 === 'SI'" v-model.number="cantZ10" label="Cantidad Z10" type="number" />
  
      <v-select v-model="aletas" :items="['SI', 'NO']" label="¿Tiene aletas?" />
      <v-text-field v-if="aletas === 'SI'" v-model.number="cantAletas" label="Cantidad de Aletas" type="number" />
  
      <v-divider class="my-4" />
  
      <v-alert type="info">
        <strong>Área:</strong> {{ area.toFixed(2) }} m² <br>
        <strong>Costo Total:</strong> ${{ costoTotal.toFixed(2) }}
      </v-alert>
      <v-alert type="success" variant="tonal" class="mt-2">
        Ganancia estimada: <strong>${{ ganancia.toFixed(2) }}</strong>
    </v-alert>

      <v-btn color="primary" @click="agregarRegistro">Agregar a tabla</v-btn>

    </v-card>
    <v-simple-table class="mt-6">
  <thead>
    <tr>
      <th>Alto</th>
      <th>Ancho</th>
      <th>Área</th>
      <th>Paleta</th>
      <th>Z16</th>
      <th>Z6</th>
      <th>Z10</th>
      <th>Aletas</th>
      <th>Costo Total</th>
      <th>Ganancia</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in registros" :key="index">
      <td>{{ item.alto }}</td>
      <td>{{ item.ancho }}</td>
      <td>{{ item.area.toFixed(2) }}</td>
      <td>{{ item.paleta }}</td>
      <td>{{ item.z16 }}</td>
      <td>{{ item.z6 }}</td>
      <td>{{ item.z10 }}</td>
      <td>{{ item.aletas }}</td>
      <td>${{ item.costo.toFixed(2) }}</td>
      <td>${{ item.ganancia.toFixed(2) }}</td>

    </tr>
  </tbody>
</v-simple-table>

  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Entradas
  const alto = ref(0)
  const ancho = ref(0)
  const paleta = ref('NO')
  const z16 = ref('NO')
  const z6 = ref('NO')
  const z10 = ref('NO')
  const aletas = ref('NO')
  const cantZ16 = ref(0)
  const cantZ6 = ref(0)
  const cantZ10 = ref(0)
  const cantAletas = ref(0)
  const VALOR_VENTA_MALLA = 173
  const registros = ref([])

const agregarRegistro = () => {
  registros.value.push({
    alto: alto.value,
    ancho: ancho.value,
    area: area.value,
    paleta: paleta.value,
    z16: z16.value === 'SI' ? cantZ16.value : 0,
    z6: z6.value === 'SI' ? cantZ6.value : 0,
    z10: z10.value === 'SI' ? cantZ10.value : 0,
    aletas: aletas.value === 'SI' ? cantAletas.value : 0,
    costo: costoTotal.value,
    ganancia: area.value * VALOR_VENTA_MALLA - costoTotal.value
  })

  // Opcional: limpiar formulario
  alto.value = 0
  ancho.value = 0
  paleta.value = 'NO'
  z16.value = 'NO'; cantZ16.value = 0
  z6.value = 'NO'; cantZ6.value = 0
  z10.value = 'NO'; cantZ10.value = 0
  aletas.value = 'NO'; cantAletas.value = 0
}

  
  // Valores fijos (pueden venir de una API en el futuro)
  const VALORES = {
    mallaPaleta: 180,
    mallaLisa: 145,
    z16: 7,
    z6: 2,
    z10: 2,
    aleta: 15.2,
    mallaVenta: 173
  }
  
  const area = computed(() => alto.value/1000 * ancho.value/1000)
  
  const costoTotal = computed(() => {
    let total = 0
    const precioMalla = paleta.value === 'SI' ? VALORES.mallaPaleta : VALORES.mallaLisa
    total += area.value * precioMalla
  
    if (z16.value === 'SI') total += cantZ16.value * VALORES.z16
    if (z6.value === 'SI') total += cantZ6.value * VALORES.z6
    if (z10.value === 'SI') total += cantZ10.value * VALORES.z10
    if (aletas.value === 'SI') total += cantAletas.value * VALORES.aleta
  
    return total
  })

  const ganancia = computed(() => {
    return area.value * VALOR_VENTA_MALLA - costoTotal.value
    })

  </script>
  