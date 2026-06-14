<template>
  <div class="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
    <div class="max-w-md text-center">
      <div class="bg-white rounded-lg shadow-md p-12">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-800 mb-4">Pedido Realizado!</h1>
        <p class="text-gray-600 mb-8">
          Obrigado pela sua compra! Você receberá um email com detalhes do seu pedido em breve.
        </p>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <p class="text-gray-600 text-sm mb-2">Número do Pedido</p>
          <p class="text-2xl font-bold text-gray-800">#{{ orderNumber }}</p>
        </div>

        <div class="space-y-3">
          <RouterLink
            to="/orders"
            class="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Ver Meus Pedidos
          </RouterLink>

          <RouterLink
            to="/"
            class="block w-full border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-2 rounded-lg transition"
          >
            Voltar à Página Inicial
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const orderNumber = ref(Math.random().toString().slice(2, 11));

onMounted(() => {
  // Aqui você poderia buscar o número do pedido de um contexto compartilhado
});
</script>
