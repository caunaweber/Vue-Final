<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Painel Administrativo</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <WeatherWidget />

      <v-btn icon @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { showConfirm } from '../services/alertService';
import WeatherWidget from '../components/WeatherWidget.vue';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  const confirmed = await showConfirm('Sair do Sistema', 'Você tem certeza que deseja sair?');
  if (confirmed) {
    authStore.logout();
    router.push('/login');
  }
};
</script>