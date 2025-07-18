<template>
  <div v-if="weather" class="d-flex align-center me-4">
    <v-icon start>mdi-weather-partly-cloudy</v-icon>
    <span>Joinville: {{ weather.temp }}°C ({{ weather.description }})</span>
  </div>
  <div v-else class="me-4">
    <span>Carregando clima...</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const weather = ref(null);
const API_KEY = '082b93c347a2fd8d1364fd27399bbb1f';
const city = 'Joinville';

onMounted(async () => {
  if (!API_KEY || API_KEY === '') {
    console.warn('Chave da API OpenWeatherMap não configurada.');
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const response = await axios.get(url);
    weather.value = {
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
    };
  } catch (error) {
    console.error("Erro ao buscar clima:", error);
    weather.value = { temp: '--', description: 'erro' };
  }
});
</script>