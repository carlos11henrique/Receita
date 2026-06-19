<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

interface Categoria {
  id: number;
  nome: string;
}

const router = useRouter();

const categorias = ref<Categoria[]>([]);
const isLoading = ref(false);
const error = ref('');
const message = ref('');

const form = reactive({
  titulo: '',
  descricao: '',
  modoPreparo: '',
  preco: 0,
  categorias: [] as number[],
});

const carregarCategorias = async () => {
  try {
    error.value = '';

    const { data } = await api.get('/categorias');

    categorias.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
    error.value = 'Erro ao carregar categorias.';
  }
};

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    message.value = '';

    await api.post('/products', {
      title: form.titulo,
      description: form.descricao,
      price: Number(form.preco),
      status: 'pending',
    });

    message.value = 'Receita enviada para análise.';

    setTimeout(() => {
      router.push('/products');
    }, 1500);
  } catch (err: any) {
    console.error(err.response?.data);

    error.value =
      err?.response?.data?.message ||
      'Erro ao criar receita.';
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  carregarCategorias();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold mb-6">
          Criar Receita
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">
              Título
            </label>
            <input
              v-model="form.titulo"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label class="block mb-1 font-medium">
              Descrição
            </label>
            <textarea
              v-model="form.descricao"
              class="w-full border rounded px-3 py-2"
              rows="3"
              required
            />
          </div>

          <div>
            <label class="block mb-1 font-medium">
              Modo de Preparo
            </label>
            <textarea
              v-model="form.modoPreparo"
              class="w-full border rounded px-3 py-2"
              rows="6"
              required
            />
          </div>

          <div>
            <label class="block mb-1 font-medium">
              Preço
            </label>
            <input
              v-model.number="form.preco"
              type="number"
              step="0.01"
              min="0"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label class="block mb-1 font-medium">
              Categorias
            </label>

            <select
              v-model="form.categorias"
              multiple
              class="w-full border rounded px-3 py-2 h-40"
            >
              <option
                v-for="categoria in categorias"
                :key="categoria.id"
                :value="categoria.id"
              >
                {{ categoria.nome }}
              </option>
            </select>

            <p class="text-xs text-gray-500 mt-1">
              Segure CTRL para selecionar várias categorias.
            </p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            {{ isLoading ? 'Salvando...' : 'Criar Receita' }}
          </button>
        </form>

        <p v-if="message" class="mt-4 text-green-600">
          {{ message }}
        </p>

        <p v-if="error" class="mt-4 text-red-600">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>