<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Meus Pedidos</h1>

      <div v-if="!authStore.isAuthenticated" class="text-center py-12">
        <p class="text-gray-600 text-lg mb-4">Você precisa estar logado para ver seus pedidos</p>
        <RouterLink
          to="/login"
          class="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Fazer Login
        </RouterLink>
      </div>

      <div v-else-if="isLoading" class="text-center py-12">
        <p class="text-gray-600">Carregando pedidos...</p>
      </div>

      <div v-else-if="orders.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
        <p class="text-gray-600 text-lg mb-4">Você não tem pedidos ainda</p>
        <RouterLink
          to="/products"
          class="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Começar a Comprar
        </RouterLink>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-600">Número do Pedido</p>
              <p class="font-bold text-lg">#{{ order.id }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-600">Data</p>
              <p class="font-bold">{{ formatDate(order.createdAt) }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-600">Total</p>
              <p class="font-bold text-red-500">R$ {{ formatPrice(order.total) }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-600">Status</p>
              <p
                :class="[
                  'font-bold inline-block px-3 py-1 rounded-full',
                  statusColors[order.status],
                ]"
              >
                {{ statusText[order.status] }}
              </p>
            </div>
          </div>

          <div v-if="order.product" class="border-t pt-4">
            <p class="font-semibold text-gray-700 mb-2">Produto:</p>
            <p>{{ order.product.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { orderService } from '../services/api';
import type { Order } from '../types';

const authStore = useAuthStore();

const orders = ref<Order[]>([]);
const isLoading = ref(true);

const statusText: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const formatPrice = (price: number) => {
  return price.toFixed(2).replace('.', ',');
};

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
};

onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      orders.value = await orderService.getOrders();
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      isLoading.value = false;
    }
  }
});
</script>
