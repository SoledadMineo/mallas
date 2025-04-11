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
    </v-row>
    <v-row>
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
      <v-col>
        <v-text-field
          label="Valor Venta Malla"
          :model-value="208"
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
    </v-row>
    <v-row>
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
          <strong>Costo Total Malla</strong><br />
          <strong>USD {{ costoTotal.toFixed(2) }}</strong>
        </v-alert>
      </v-col>
      <v-col cols="4" style="text-align: start">
        <v-alert style="color: #4c6cd4">
          <strong>Valor Total Venta Malla</strong> <br />
          <strong>USD {{ ventaMalla.toFixed(2) }}</strong>
        </v-alert>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="4" style="text-align: start">
        <v-alert style="color: #4c6cd4">
          <strong>Ganancia Total</strong><br />
          <strong>USD {{ gananciaUSD.toFixed(2) }} m2</strong>
        </v-alert>
      </v-col>
      <v-col cols="4" style="text-align: start">
        <v-alert style="color: #4c6cd4">
          <strong>Ganancia Total</strong><br />
          <strong>$ {{ ganancia$.toFixed(2) }}</strong>
        </v-alert>
      </v-col>
      <v-col cols="4" style="text-align: start">
        <v-alert style="color: #4c6cd4">
          <strong>Ganancia Total p/p</strong> <br />
          <strong>$ {{ gananciaPP.toFixed(2) }}</strong>
        </v-alert>
      </v-col>
    </v-row>
    <!-- <p>Fórmula: {{ formulaCosto }} = ${{ costoTotal }}</p> -->

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
    <v-data-table :headers="headers" :items="items" class="custom-table">
      <template v-slot:headers="{ columns }">
        <tr>
          <th v-for="column in columns" :key="column.key" class="custom-header">
            {{ column.text }}
          </th>
        </tr>
      </template>
      <template v-slot:item-costoTotal="{ item }">
        {{ item.costoTotal }}
      </template>
      <template v-slot:item-ventaMalla="{ item }">
        {{ item.ventaMalla }}
      </template>
      <template v-slot:item-gananciaUSD="{ item }">
        {{ item.gananciaUSD }}
      </template>
      <template v-slot:item-ganancia$="{ item }">
        {{ item.ganancia$ }}
      </template>
      <template v-slot:item-gananciaPP="{ item }">
        {{ item.gananciaPP }}
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
  { text: "N° Orden", value: "nroOrden", align: "center" },
  { text: "Ancho (m)", value: "ancho", align: "center" },
  { text: "Largo (m)", value: "largo", align: "center" },
  { text: "Sup. Total (m)", value: "area", align: "center" },
  { text: "Paleta", value: "paleta", align: "center" },
  { text: "Z6", value: "z6", align: "center" },
  { text: "Z10", value: "z10", align: "center" },
  { text: "Z16", value: "z16", align: "center" },
  { text: "Aletas", value: "aletas", align: "center" },
  { text: "Costo Total", value: "costoTotal", align: "center" },
  { text: "Valor Venta", value: "ventaMalla", align: "center" },
  { text: "Ganancia USD", value: "gananciaUSD", align: "center" },
  { text: "Ganancia $", value: "ganancia$", align: "center" },
  { text: "Ganancia p/p", value: "gananciaPP", align: "center" },
];
const VALORES = {
  mallaPaleta: 180,
  mallaLisa: 145,
  mallaVenta: 208,
  z16: 7,
  z6: 2,
  z10: 2,
  aleta: 15.2,
  dolar: 1095,
};

const agregarRegistro = () => {
  registros.value.push({
    nroOrden: nroOrden.value,
    ancho: ancho.value,
    largo: largo.value,
    area: area.value,
    paleta: paleta.value,
    z6: z6.value === "SI" ? cantZ6.value : 0,
    z10: z10.value === "SI" ? cantZ10.value : 0,
    z16: z16.value === "SI" ? cantZ16.value : 0,
    aletas: aletas.value === "SI" ? cantAletas.value : 0,
    costoTotal: Number(costoTotal.value.toFixed(2)),
    ventaMalla: Number(ventaMalla.value.toFixed(2)),
    gananciaUSD: Number(gananciaUSD.value.toFixed(2)),
    ganancia$: Number(ganancia$.value.toFixed(2)),
    gananciaPP: Number(gananciaPP.value.toFixed(2)),
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

const area = computed(() => ((ancho.value / 1000) * largo.value) / 1000);

const costoTotal = computed(() => {
  let total = 0;
  const precioMalla =
    paleta.value === "SI" ? VALORES.mallaPaleta : VALORES.mallaLisa;
  total += area.value * precioMalla;

  if (z16.value === "SI") total += cantZ16.value * VALORES.z16 * area.value;
  if (z6.value === "SI") total += cantZ6.value * VALORES.z6 * area.value;
  if (z10.value === "SI") total += cantZ10.value * VALORES.z10 * area.value;
  if (aletas.value === "SI")
    total += cantAletas.value * VALORES.aleta * area.value;

  return total;
});

// const formulaCosto = computed(() => {
//   const partes = [];
//   const precioMalla =
//     paleta.value === "SI" ? VALORES.mallaPaleta : VALORES.mallaLisa;
//   partes.push(`${area.value} x ${precioMalla}`);

//   if (z16.value === "SI")
//     partes.push(`${cantZ16.value} x ${VALORES.z16} x ${area.value}`);
//   if (z6.value === "SI")
//     partes.push(`${cantZ6.value} x ${VALORES.z6} x ${area.value}`);
//   if (z10.value === "SI")
//     partes.push(`${cantZ10.value} x ${VALORES.z10} x ${area.value}`);
//   if (aletas.value === "SI")
//     partes.push(`${cantAletas.value} x ${VALORES.aleta} x ${area.value}`);

//   return partes.join(" + ");
// });

const calculos = computed(() => {
  const ventaMalla = area.value * VALOR_VENTA_MALLA;
  const gananciaUSD = ventaMalla - costoTotal.value;
  const ganancia$ = gananciaUSD * VALORES.dolar;
  const gananciaPP = ganancia$ / 5;

  return { ventaMalla, gananciaUSD, ganancia$, gananciaPP };
});

const ventaMalla = computed(() => calculos.value.ventaMalla);
const gananciaUSD = computed(() => calculos.value.gananciaUSD);
const ganancia$ = computed(() => calculos.value.ganancia$);
const gananciaPP = computed(() => calculos.value.gananciaPP);

const valorEnMetros = (valor) => {
  return (valor / 1000).toFixed(3);
};

const exportToExcel = () => {
  const data = registros.value.map((item, index) => ({
    'Nro. Orden': index + 1,
    'Ancho': item.ancho,
    'Largo': item.largo,
    'Superficie Total': item.superficieTotal,
    'Paleta': item.paleta,
    'Z16': item.z16,
    'Z6': item.z6,
    'Z10': item.z10,
    'Aletas': item.aletas,
    'Costo Total': item.costoTotal,
    'Venta Malla': item.ventaMalla,
    'Ganancia Total-USD': item.gananciaUSD,
    'Ganancia Total-$': item.ganancia$,
    'Ganancia p/p - $': item.gananciaPP
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet['!cols'] = [
    { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 8 },
    { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 },
    { wch: 15 }, { wch: 18 }, { wch: 18 }, { wch: 18 }
  ];

  worksheet['!freeze'] = { xSplit: 0, ySplit: 1 };

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

.custom-table {
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.custom-header {
  background-color: #1976d2;
  color: white;
  padding: 8px;
  text-align: center;
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
