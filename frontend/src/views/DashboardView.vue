<template>
  <v-container>
    <h1 class="text-h4 mb-4">Gerenciamento de Produtos</h1>
    
    <v-data-table
      :headers="headers"
      :items="produtos"
      class="elevation-1"
      item-key="id"
    >
      <template v-slot:item.preco="{ item }">
        <span>{{ formatarPreco(item.preco) }}</span>
      </template>
    </v-data-table>

  </v-container>
</template>

<script setup>
// O script continua o mesmo, sem alterações
import { onMounted, computed } from 'vue';
import { useProdutoStore } from '../stores/produtoStore';

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Nome', value: 'nome' },
  { title: 'Categoria', value: 'categoria' },
  { title: 'Preço', value: 'preco' },
];

const produtoStore = useProdutoStore();
const produtos = computed(() => produtoStore.produtos);

const formatarPreco = (value) => {
  if (!value) return '';
  return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

onMounted(() => {
  produtoStore.fetchProdutos();
});
</script>