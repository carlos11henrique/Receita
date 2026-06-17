<template>
  <div class="min-h-screen bg-gray-50">
    <Hero />

    <!-- Featured Products -->
    <ProductGrid title="Receitas em Destaque">
      <template #default>
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </template>
    </ProductGrid>

    <!-- Categories Section -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">Categorias</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="category in ['Doces', 'Salgados', 'Bebidas', 'Sobremesas', 'Veganas', 'Sem Glúten', 'Low Carb', 'Fitness']"
            :key="category"
            class="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 cursor-pointer transition"
          >
            <h3 class="text-xl font-bold text-gray-800">{{ category }}</h3>
            <p class="text-gray-600 mt-2">Explore nossa coleção</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Entrega Rápida</h3>
          <p class="text-gray-600">Receba seus pedidos em até 7 dias úteis</p>
        </div>

        <div class="text-center">
          <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Seguro e Confiável</h3>
          <p class="text-gray-600">Compre com confiança e segurança total</p>
        </div>

        <div class="text-center">
          <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Suporte 24/7</h3>
          <p class="text-gray-600">Estamos sempre aqui para ajudar você</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProductsStore } from '../stores/products';
import ProductCard from '../components/product/ProductCard.vue';
import ProductGrid from '../components/layout/ProductGrid.vue';
import Hero from '../components/layout/Hero.vue';

const productsStore = useProductsStore();

const featuredProducts = computed(() => productsStore.products.slice(0, 8));

onMounted(() => {
  productsStore.fetchProducts();
});
</script>
