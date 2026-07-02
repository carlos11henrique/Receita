<template>
  <div
    class="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
    @click="goToProduct"
  >
    <!-- Product Image -->
    <div class="relative h-64 bg-gray-100 overflow-hidden group">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <!-- Badge -->
      <div
        v-if="product.status === 'active'"
        class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
      >
        Em Estoque
      </div>
      <div
        v-else
        class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
      >
        Indisponível
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="font-bold text-lg text-gray-800 truncate">{{ product.title }}</h3>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>

      <!-- Rating -->
      <div class="flex items-center gap-2 mb-3">
        <div class="flex gap-0.5">
          <svg
            v-for="i in 5"
            :key="i"
            :class="[
              'w-4 h-4',
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
        <span class="text-sm text-gray-600">({{ product.reviews || 0 }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <span class="text-2xl font-bold text-red-500">R$ {{ formatPrice(product.price) }}</span>
      </div>

      <!-- Add to Cart Button -->
<!-- Actions -->
<div v-if="product.status === 'active'" class="flex gap-2">
  <button
    @click.stop="addToCart"
    class="flex-1 bg-white border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-2 rounded-lg transition"
  >
    🛒 Carrinho
  </button>

  <button
    @click.stop="buyNow"
    class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
  >
    Comprar
  </button>
</div>

<button
  v-else
  disabled
  class="w-full bg-gray-300 text-gray-500 font-semibold py-2 rounded-lg cursor-not-allowed"
>
  Indisponível
</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import type { Product } from '../../types';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const cartStore = useCartStore();

const formatPrice = (price: number | string) => {
  return parseFloat(String(price)).toFixed(2).replace('.', ',');
};

const goToProduct = () => {
  router.push(`/product/${props.product.id}`);
};

const addToCart = () => {
  cartStore.addToCart(props.product);
};

const buyNow = () => {
  cartStore.addToCart(props.product);
  router.push('/checkout');
};
</script>
