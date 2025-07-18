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

    async addProduto(formData) {
      try {
        await api.post('/produtos', formData); 
        await this.fetchProdutos();
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
      }
    },

    async updateProduto(formData) {
      try {
        const id = formData.get('id');
        await api.put(`/produtos/${id}`, formData);
        await this.fetchProdutos();
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
      }
    },

    async deleteProduto(id) {
      try {
        await api.delete(`/produtos/${id}`);
        await this.fetchProdutos();
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    }
  },
});