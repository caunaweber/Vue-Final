import { defineStore } from 'pinia';
import api from '../services/api';

export const useProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [], 
  }),
  actions: {
    async fetchProdutos() {
      try {
        const response = await api.get('/produtos');
        this.produtos = response.data; 
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },

    async addProduto(_produto) {
    },
    async updateProduto(_produto) {
    },
    async deleteProduto(_id) {
    }
  },
});