<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <RouterLink to="/products" class="text-red-500 hover:text-red-600 mb-6 inline-flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </RouterLink>

      <div v-if="isLoading" class="text-center py-12">
        <p class="text-gray-600">Carregando produto...</p>
      </div>

      <div v-else-if="!product" class="text-center py-12">
        <p class="text-gray-600 text-lg">Produto não encontrado</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.title"
              class="max-h-96 max-w-full object-contain"
            />
            <svg v-else class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <!-- Product Details -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ product.title }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-2 mb-4">
            <div class="flex gap-0.5">
              <svg
                v-for="i in 5"
                :key="i"
                :class="[
                  'w-5 h-5',
                  i <= (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300',
                ]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <span class="text-gray-600">({{ product.reviews || 0 }} avaliações)</span>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <p class="text-4xl font-bold text-red-500">R$ {{ formatPrice(product.price) }}</p>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-2">Descrição</h3>
            <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Quantity -->
          <div class="mb-6">
            <label class="block text-sm font-bold text-gray-700 mb-2">Quantidade</label>
            <div class="flex items-center gap-4">
              <button
                @click="quantity > 1 && quantity--"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                -
              </button>
              <span class="text-2xl font-bold">{{ quantity }}</span>
              <button
                @click="quantity++"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                +
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button
              v-if="product.status === 'active'"
              @click="addToCart"
              class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition"
            >
              Adicionar ao Carrinho
            </button>
            <button
              v-else
              disabled
              class="flex-1 bg-gray-300 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed"
            >
              Indisponível
            </button>
            <button
              @click="toggleFavorite"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition"
            >
              <svg
                :class="['w-6 h-6', isFavorite ? 'fill-red-500 text-red-500' : '']"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <!-- Stock Info -->
          <p
            v-if="product.status === 'active'"
            class="text-sm text-green-600 font-semibold mt-4"
          >
            ✓ Em estoque e pronto para envio
          </p>
          <p v-else class="text-sm text-red-600 font-semibold mt-4">
            ✗ Produto indisponível
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types';
import { productService } from '../services/api';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const isLoading = ref(true);
const quantity = ref(1);
const isFavorite = ref(false);

const formatPrice = (price: number | string) => {
  return parseFloat(String(price)).toFixed(2).replace('.', ',');
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value);
    router.push('/cart');
  }
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

onMounted(async () => {
  const productId = Number(route.params.id);
  try {
    product.value = await productService.getProduct(productId);
  } catch (error) {
    console.error('Error loading product:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
