<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 pa-4">
          <v-card-title class="text-h5 text-center">
            Login do Painel
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field v-model="username" label="Nome de Usuário" name="login" prepend-icon="mdi-account"
                type="text" required></v-text-field>

              <v-text-field v-model="password" label="Senha" name="password" prepend-icon="mdi-lock" type="password"
                required></v-text-field>

              <v-card-actions>
                <v-card-actions>
                  <v-btn text to="/registrar">Criar Conta</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary">Entrar</v-btn>
                </v-card-actions>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import { showError } from '../services/alertService';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore();

      const credentials = {
        username: this.username,
        password: this.password,
      };

      const success = await authStore.login(credentials);

      if (success) {
        this.$router.push('/');
      } else {
        showError('Nome de usuário ou senha incorretos.');
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>