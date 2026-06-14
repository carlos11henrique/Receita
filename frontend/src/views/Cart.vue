<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div v-if="cartStore.items.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p class="text-gray-600 text-lg mb-4">Seu carrinho está vazio</p>
            <RouterLink
              to="/products"
              class="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Continuar Comprando
            </RouterLink>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.productId" class="bg-white rounded-lg shadow-md p-6">
              <div class="flex gap-6">
                <!-- Product Image -->
                <div class="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0">
                  <img
                    v-if="item.product.image"
                    :src="item.product.image"
                    :alt="item.product.title"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Product Info -->
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-800">{{ item.product.title }}</h3>
                  <p class="text-gray-600 mt-1 line-clamp-2">{{ item.product.description }}</p>

                  <!-- Price and Quantity -->
                  <div class="mt-4 flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">Preço unitário</p>
                      <p class="text-xl font-bold text-red-500">R$ {{ formatPrice(item.price) }}</p>
                    </div>

                    <div class="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                      <button
                        @click="decreaseQuantity(item.productId)"
                        class="bg-white hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition"
                      >
                        -
                      </button>
                      <span class="font-bold w-8 text-center">{{ item.quantity }}</span>
                      <button
                        @click="increaseQuantity(item.productId)"
                        class="bg-white hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition"
                      >
                        +
                      </button>
                    </div>

                    <div class="text-right">
                      <p class="text-sm text-gray-600">Subtotal</p>
                      <p class="text-xl font-bold text-gray-800">R$ {{ formatPrice(item.price * item.quantity) }}</p>
                    </div>
                  </div>

                  <!-- Remove Button -->
                  <button
                    @click="removeItem(item.productId)"
                    class="mt-4 text-red-500 hover:text-red-600 font-semibold transition"
                  >
                    Remover do Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>

            <div class="space-y-4 mb-6 border-b pb-6">
              <div class="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>R$ {{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Frete</span>
                <span>R$ {{ formatPrice(cartStore.shipping) }}</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Impostos (10%)</span>
                <span>R$ {{ formatPrice(cartStore.tax) }}</span>
              </div>
            </div>

            <div class="flex justify-between text-2xl font-bold text-gray-800 mb-6">
              <span>Total</span>
              <span class="text-red-500">R$ {{ formatPrice(cartStore.total) }}</span>
            </div>

            <button
              v-if="cartStore.items.length > 0"
              @click="checkout"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition"
            >
              Prosseguir para Checkout
            </button>

            <RouterLink
              to="/products"
              class="block text-center mt-4 text-red-500 hover:text-red-600 font-semibold transition"
            >
              Continuar Comprando
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';

const router = useRouter();
const cartStore = useCartStore();

const formatPrice = (price: number) => {
  return price.toFixed(2).replace('.', ',');
};

const increaseQuantity = (productId: number) => {
  const item = cartStore.items.find((i) => i.productId === productId);
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1);
  }
};

const decreaseQuantity = (productId: number) => {
  const item = cartStore.items.find((i) => i.productId === productId);
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(productId, item.quantity - 1);
  }
};

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId);
};

const checkout = () => {
  router.push('/checkout');
};
</script>
