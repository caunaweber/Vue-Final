<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Gerenciamento de Produtos</h1>
      <v-btn color="primary" @click="openNewItemDialog">Novo Produto</v-btn>
    </div>

    <v-data-table :headers="headers" :items="produtos" class="elevation-1" item-key="id">
      <template v-slot:item.preco="{ item }">
        <span>{{ formatarPreco(item.preco) }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ isEditing ? 'Editar Produto' : 'Novo Produto' }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="editedItem.nome" label="Nome do Produto"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.categoria" label="Categoria"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.preco" label="Preço" type="number" prefix="R$"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="editedItem.descricao" label="Descrição"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProdutoStore } from '../stores/produtoStore';
import { showConfirm, showSuccess } from '../services/alertService';

const dialog = ref(false);
const isEditing = ref(false);
const editedItem = ref({
  id: null,
  nome: '',
  descricao: '',
  categoria: '',
  preco: 0,
});

const headers = [
  { title: 'ID', key: 'id', sortable: true },
  { title: 'Nome', key: 'nome', sortable: true },
  { title: 'Categoria', key: 'categoria', sortable: true },
  { title: 'Preço', key: 'preco', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false },
];

const produtoStore = useProdutoStore();
const produtos = computed(() => produtoStore.produtos);

onMounted(() => {
  produtoStore.fetchProdutos();
});

const formatarPreco = (value) => {
  if (!value) return '';
  return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const openNewItemDialog = () => {
  isEditing.value = false;
  editedItem.value = { id: null, nome: '', descricao: '', categoria: '', preco: 0 };
  dialog.value = true;
};

const editItem = (item) => {
  isEditing.value = true;
  editedItem.value = { ...item };
  dialog.value = true;
};

const deleteItem = async (item) => {
  const confirmed = await showConfirm(
    'Você tem certeza?',
    `O produto "${item.nome}" será deletado permanentemente.`
  );

  if (confirmed) {
    await produtoStore.deleteProduto(item.id);
    showSuccess('Produto deletado com sucesso!');
  }
};

const closeDialog = () => {
  dialog.value = false;
};

const save = async () => {
  if (isEditing.value) {
    await produtoStore.updateProduto(editedItem.value);
  } else {
    await produtoStore.addProduto(editedItem.value);
  }
  closeDialog();
};
</script>