<template>
    <v-container class="fill-height d-flex justify-center align-center">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12 pa-4">
                    <v-card-title class="text-h5 text-center">
                        Criar Nova Conta
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="handleRegister">
                            <v-text-field v-model="username" label="Nome de Usuário" prepend-icon="mdi-account"
                                type="text" required></v-text-field>

                            <v-text-field v-model="password" label="Senha" prepend-icon="mdi-lock" type="password"
                                required></v-text-field>

                            <v-card-actions class="pt-4">
                                <v-btn text to="/login">Voltar para Login</v-btn>
                                <v-spacer></v-spacer>
                                <v-btn type="submit" color="primary">Registrar</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { showSuccess, showError } from '../services/alertService';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
    const success = await authStore.register({
        username: username.value,
        password: password.value
    });

    if (success) {
        showSuccess('Usuário registrado com sucesso!');
        router.push('/login');
    } else {
        showError('Erro ao registrar usuário.');
    }
};
</script>

<style scoped>
.fill-height {
    min-height: 100vh;
}
</style>