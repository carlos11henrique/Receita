<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Meu Perfil</h1>

      <div v-if="!authStore.isAuthenticated" class="text-center py-12">
        <p class="text-gray-600 text-lg mb-4">Você precisa estar logado</p>
        <RouterLink
          to="/login"
          class="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Fazer Login
        </RouterLink>
      </div>

      <div v-else class="bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="updateProfile" class="space-y-6">
          <!-- Profile Picture -->
          <div class="flex items-center gap-6 pb-6 border-b">
            <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800">{{ authStore.user?.name }}</p>
              <p class="text-gray-600 text-sm">{{ authStore.user?.role }}</p>
            </div>
          </div>

          <!-- Personal Info -->
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-4">Informações Pessoais</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Nome</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">CPF</label>
                <input
                  v-model="form.cpf"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Telefone</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">CEP</label>
                <input
                  v-model="form.cep"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Rua</label>
                <input
                  v-model="form.street"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Número</label>
                <input
                  v-model="form.number"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Complemento</label>
                <input
                  v-model="form.complement"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Cidade</label>
                <input
                  v-model="form.city"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Estado</label>
                <input
                  v-model="form.state"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Account Type -->
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">Tipo de Conta</p>
            <p class="font-semibold text-gray-800 capitalize">{{ authStore.user?.role }}</p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
          >
            {{ isLoading ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </form>

        <!-- Logout Button -->
        <button
          @click="logout"
          class="w-full mt-4 border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-2 rounded-lg transition"
        >
          Sair da Conta
        </button>
      </div>

      <div v-if="authStore.isAuthenticated" class="max-w-2xl mx-auto mt-8 space-y-6">
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-lg bg-white p-5 shadow-sm">
            <p class="text-sm text-gray-500">Receitas publicadas</p>
            <p class="mt-3 text-3xl font-semibold text-gray-900">{{ createdRecipes.length }}</p>
          </div>
          <div class="rounded-lg bg-white p-5 shadow-sm">
            <p class="text-sm text-gray-500">Vendas da suas receitas</p>
            <p class="mt-3 text-3xl font-semibold text-gray-900">{{ salesCount }}</p>
          </div>
          <div class="rounded-lg bg-white p-5 shadow-sm">
            <p class="text-sm text-gray-500">Compras feitas</p>
            <p class="mt-3 text-3xl font-semibold text-gray-900">{{ purchaseCount }}</p>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Receitas criadas</h2>
              <p class="text-sm text-gray-500">Veja todas as receitas que você publicou.</p>
            </div>
            <button
              @click="loadProfileStats"
              class="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Atualizar
            </button>
          </div>

          <div class="mt-6 space-y-4">
            <p v-if="isFetchingStats" class="text-sm text-gray-500">Carregando estatísticas...</p>
            <p v-else-if="statsError" class="text-sm text-red-600">{{ statsError }}</p>
            <p v-else-if="createdRecipes.length === 0" class="text-sm text-gray-600">
              Ainda não há receitas criadas por você.
            </p>

            <div v-else class="space-y-4">
              <div
                v-for="recipe in createdRecipes"
                :key="recipe.id"
                class="rounded-2xl border border-gray-200 p-4 hover:border-red-400 transition"
              >
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ recipe.title }}</h3>
                    <p class="text-sm text-gray-500">{{ recipe.category || 'Sem categoria' }}</p>
                  </div>
                  <span class="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                    R$ {{ recipe.price.toFixed(2) }}
                  </span>
                </div>
                <p class="mt-3 text-sm text-gray-600">{{ recipe.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { productService, orderService } from '../services/api';
import type { Product, Order } from '../types';

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const isFetchingStats = ref(false);
const error = ref('');
const statsError = ref('');

const products = ref<Product[]>([]);
const orders = ref<Order[]>([]);

const form = reactive({
  name: '',
  email: '',
  cpf: '',
  phone: '',
  cep: '',
  street: '',
  number: '',
  complement: '',
  city: '',
  state: '',
});

const createdRecipes = computed(() => {
  if (!authStore.user) return [];
  return products.value.filter((product) => product.creator?.id === authStore.user?.id);
});

const salesCount = computed(() => {
  if (!authStore.user) return 0;
  return orders.value.filter((order) =>
    order.product ? createdRecipes.value.some((recipe) => recipe.id === order.product?.id) : false,
  ).length;
});

const purchaseCount = computed(() => {
  if (!authStore.user) return 0;
  return orders.value.filter((order) => order.customer?.id === authStore.user?.id).length;
});

onMounted(() => {
  if (authStore.user) {
    form.name = authStore.user.name;
    form.email = authStore.user.email;
    form.cpf = authStore.user.cpf || '';
    form.phone = authStore.user.phone || '';
    loadProfileStats();
  }
});

const loadProfileStats = async () => {
  if (!authStore.user) return;

  isFetchingStats.value = true;
  statsError.value = '';

  try {
    const [allProducts, allOrders] = await Promise.all([
      productService.getAllProducts(),
      orderService.getOrders(),
    ]);
    products.value = allProducts;
    orders.value = allOrders;
  } catch (err: any) {
    statsError.value = err.response?.data?.message || err.message || 'Erro ao carregar estatísticas do perfil';
  } finally {
    isFetchingStats.value = false;
  }
};

const updateProfile = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    const success = await authStore.updateProfile({
      name: form.name,
      cpf: form.cpf,
      phone: form.phone,
      cep: form.cep,
      street: form.street,
      number: form.number,
      complement: form.complement,
      city: form.city,
      state: form.state,
    });

    if (success) {
      alert('Perfil atualizado com sucesso!');
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao atualizar perfil';
  } finally {
    isLoading.value = false;
  }
};

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>
