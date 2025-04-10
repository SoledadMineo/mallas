<!-- src/components/CalculadoraCosto.vue -->
<template>
  <v-card class="pa-4" elevation="5">
    <v-card-title class="titulo">COSTOS - GANANCIAS MALLAS</v-card-title>
    <v-divider class="my-4" />
    <v-card-title style="color: #4c6cd4">Valores de costos (USD)</v-card-title>
    <v-row>
      <v-col>
        <v-text-field
          label="Piñones Z6"
          :model-value="2"
          disabled
          density="compact"
        />
      </v-col>
      <v-col>
        <v-text-field
          label="Piñones Z10"
          :model-value="2"
          disabled
          density="compact"
        />
      </v-col>
      <v-col>
        <v-text-field
          label="Piñones Z16"
          :model-value="7"
          disabled
          density="compact"
        />
      </v-col>
      <v-col>
        <v-text-field
          label="Aletas"
          :model-value="15.2"
          disabled
          density="compact"
        />
      </v-col>
      <v-col>
        <v-text-field
          label="Malla Lisa"
          :model-value="145"
          disabled
          density="compact"
        />
      </v-col>
      <v-col>
        <v-text-field
          label="Malla con Paleta"
          :model-value="180"
          disabled
          density="compact"
        />
      </v-col>
      <v-col>
        <v-text-field
          label="Dolar"
          :model-value="1095"
          disabled
          density="compact"
        />
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <v-card-title style="color: #4c6cd4"
      >Ingresar los datos de la malla</v-card-title
    >
    <v-row>
      <v-col cols="3">
        <v-text-field v-model.number="ancho" label="Ancho (mm)" type="number" />
      </v-col>
      <v-text-field
        :model-value="valorEnMetros(ancho)"
        label="Ancho (m)"
        type="number"
        readonly
        disabled=""
      />
      <v-col cols="3">
        <v-text-field v-model.number="largo" label="Largo (mm)" type="number" />
      </v-col>
      <v-text-field
        :model-value="valorEnMetros(largo)"
        label="Largo (m)"
        type="number"
        readonly
        disabled=""
      />
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model.number="nroOrden"
          label="N° de Orden"
          type="number"
        />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="paleta"
          :items="['SI', 'NO']"
          label="¿Tiene paleta?"
        />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="z16"
          :items="['SI', 'NO']"
          label="¿Tiene piñones Z16?"
        />
        <v-text-field
          v-if="z16 === 'SI'"
          v-model.number="cantZ16"
          label="Cantidad Z16"
          type="number"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-select
          v-model="z6"
          :items="['SI', 'NO']"
          label="¿Tiene piñones Z6?"
        />
        <v-text-field
          v-if="z6 === 'SI'"
          v-model.number="cantZ6"
          label="Cantidad Z6"
          type="number"
        />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="z10"
          :items="['SI', 'NO']"
          label="¿Tiene piñones Z10?"
        />
        <v-text-field
          v-if="z10 === 'SI'"
          v-model.number="cantZ10"
          label="Cantidad Z10"
          type="number"
        />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="aletas"
          :items="['SI', 'NO']"
          label="¿Tiene aletas?"
        />
        <v-text-field
          v-if="aletas === 'SI'"
          v-model.number="cantAletas"
          label="Cantidad de Aletas"
          type="number"
        />
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <v-row align="center">
      <v-col cols="4" style="text-align: start">
        <v-alert style="color: #4c6cd4">
          <strong>Total Superficie</strong><br />
          <strong> {{ area.toFixed(3) }} m2</strong>
        </v-alert>
      </v-col>
      <v-col cols="4" style="text-align: start">
        <v-alert style="color: #4c6cd4">
          <strong>Costo Total</strong><br />
          <strong> ${{ costoTotal.toFixed(3) }}</strong>
        </v-alert>
      </v-col>
      <v-col cols="4" style="text-align: start">
        <v-alert style="color: #4c6cd4">
          <strong>Ganancia estimada</strong> <br />
          <strong>${{ ganancia.toFixed(3) }}</strong>
        </v-alert>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-4 mb-4">
      <v-btn color="#3877F4" @click="agregarRegistro"> Mostrar en tabla </v-btn>
      <v-btn color="#dc3c2c" class="ml-5" @click="exportToExcel">
        Exportar a Excel
      </v-btn>
    </v-row>
    <v-divider class="my-4" />
    <v-card-title style="color: #4c6cd4; text-align: center">
      Tabla de Registros de Mallas
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1 custom-table"
      hide-default-footer
      dense
    >
      <template v-slot:item-ganancia="{ item }">
        <span
          :class="
            item.ganancia >= 0 ? 'ganancia-positiva' : 'ganancia-negativa'
          "
        >
          {{ formatCurrency(item.ganancia) }}
        </span>
      </template>

      <template v-slot:item-costoTotal="{ item }">
        {{ formatCurrency(item.costoTotal) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import * as XLSX from "xlsx";
import { VDataTable } from "vuetify/components";

// Entradas
const largo = ref(0);
const ancho = ref(0);
const nroOrden = ref(0);
const paleta = ref("NO");
const z16 = ref("NO");
const z6 = ref("NO");
const z10 = ref("NO");
const aletas = ref("NO");
const cantZ16 = ref(0);
const cantZ6 = ref(0);
const cantZ10 = ref(0);
const cantAletas = ref(0);
const VALOR_VENTA_MALLA = 208;
const registros = ref([]);
const items = ref([]);
const headers = [
  { text: "Ancho", value: "ancho", align: "center" },
  { text: "Largo", value: "largo", align: "center" },
  { text: "Superficie Total", value: "area", align: "center" },
  { text: "Paleta", value: "paleta", align: "center" },
  { text: "Z16", value: "z16", align: "center" },
  { text: "Z6", value: "z6", align: "center" },
  { text: "Z10", value: "z10", align: "center" },
  { text: "Aletas", value: "aletas", align: "center" },
  { text: "Costo Total", value: "costoTotal", align: "center" },
  { text: "Ganancia", value: "ganancia", align: "center" },
];

const agregarRegistro = () => {
  registros.value.push({
    ancho: ancho.value,
    largo: largo.value,
    area: area.value,
    paleta: paleta.value,
    z16: z16.value === "SI" ? cantZ16.value : 0,
    z6: z6.value === "SI" ? cantZ6.value : 0,
    z10: z10.value === "SI" ? cantZ10.value : 0,
    aletas: aletas.value === "SI" ? cantAletas.value : 0,
    costo: costoTotal.value,
    ganancia: area.value * VALOR_VENTA_MALLA - costoTotal.value,
  });

  // Opcional: limpiar formulario
  ancho.value = 0;
  largo.value = 0;
  nroOrden.value = 0;
  paleta.value = "NO";
  z16.value = "NO";
  cantZ16.value = 0;
  z6.value = "NO";
  cantZ6.value = 0;
  z10.value = "NO";
  cantZ10.value = 0;
  aletas.value = "NO";
  cantAletas.value = 0;
  items.value = [...registros.value]; // esto actualiza la tabla
};

// Valores fijos (pueden venir de una API en el futuro)
const VALORES = {
  mallaPaleta: 180,
  mallaLisa: 145,
  mallaVenta: 208,
  z16: 7,
  z6: 2,
  z10: 2,
  aleta: 15.2,
};
const formatCurrency = (value) => {
  return `$${Number(value).toFixed(3)}`;
};

const area = computed(() => ((ancho.value / 1000) * largo.value) / 1000);

const costoTotal = computed(() => {
  let total = 0;
  const precioMalla =
    paleta.value === "SI" ? VALORES.mallaPaleta : VALORES.mallaLisa;
  total += area.value * precioMalla;

  if (z16.value === "SI") total += cantZ16.value * VALORES.z16;
  if (z6.value === "SI") total += cantZ6.value * VALORES.z6;
  if (z10.value === "SI") total += cantZ10.value * VALORES.z10;
  if (aletas.value === "SI") total += cantAletas.value * VALORES.aleta;

  return total;
});

const ganancia = computed(() => {
  return area.value * VALOR_VENTA_MALLA - costoTotal.value;
});

const valorEnMetros = (valor) => {
  return (valor / 1000).toFixed(2);
};

const exportToExcel = () => {
  const data = registros.value.map((item) => ({
    Orden: item.nroOrden,
    Ancho: item.ancho,
    Largo: item.largo,
    Área: item.area,
    Paleta: item.paleta,
    Z16: item.z16,
    Z6: item.z6,
    Z10: item.z10,
    Aletas: item.aletas,
    "Costo Total": item.costo,
    Ganancia: item.ganancia,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Mallas");
  XLSX.writeFile(workbook, "costos_mallas.xlsx");
};
</script>
<style>
.titulo {
  text-align: center;
  color: #4c6cd4;
}

.custom-table .v-data-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-table .v-data-table thead {
  background-color: #1976d2;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
}

.custom-table .v-data-table__td {
  text-align: center;
  padding: 12px;
  font-size: 14px;
}

.custom-table .v-data-table__tr:nth-child(even) {
  background-color: #f9f9f9;
}

.custom-table .v-data-table__tr:hover {
  background-color: #e3f2fd;
  transition: background-color 0.3s ease;
}

.ganancia-positiva {
  color: #2e7d32;
  font-weight: bold;
}

.ganancia-negativa {
  color: #c62828;
  font-weight: bold;
}
</style>
