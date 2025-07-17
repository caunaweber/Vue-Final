import { defineStore } from 'pinia';
import api from '../services/api'; 

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials);
        const token = response.data.token;
        this.token = token;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
      } catch (error) {
        console.error('Erro no login:', error);
        return false;
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  },
});