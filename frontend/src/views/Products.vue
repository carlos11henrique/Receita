<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <h1 class="text-3xl font-bold mb-8">Catálogo de Produtos</h1>

      <div class="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div class="mb-6">
          <div class="flex items-center gap-4 justify-between">
            <div class="flex items-center gap-3">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar receitas..."
                class="px-4 py-2 border rounded-lg w-64"
              />
              <select v-model="selectedCategory" class="px-3 py-2 border rounded-lg">
                <option value="">Todas as categorias</option>
                <option v-for="cat in productsStore.categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div class="flex items-center gap-3">
              <button @click="clearFilters" class="px-4 py-2 bg-gray-100 rounded">Limpar</button>
              <RouterLink v-if="authStore.isAuthenticated" to="/product/new" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Publicar produto</RouterLink>
            </div>
          </div>
        </div>

        <div>
          <div v-if="productsStore.isLoading" class="text-center py-12">
            <p class="text-gray-600">Carregando receitas...</p>
          </div>

          <div v-else-if="productsStore.filteredProducts.length === 0" class="text-center py-12">
            <p class="text-gray-600 text-lg">Nenhuma receita encontrada</p>
          </div>

          <ProductGrid title="Catálogo de Receitas">
            <template #default>
              <ProductCard v-for="product in productsStore.filteredProducts" :key="product.id" :product="product" />
            </template>
          </ProductGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useProductsStore } from '../stores/products';
import ProductCard from '../components/product/ProductCard.vue';
import ProductGrid from '../components/layout/ProductGrid.vue';

const authStore = useAuthStore();
const productsStore = useProductsStore();

const searchQuery = computed({
  get: () => productsStore.searchQuery,
  set: (value) => productsStore.setSearchQuery(value),
});

const selectedCategory = computed({
  get: () => productsStore.selectedCategory,
  set: (value) => productsStore.setSelectedCategory(value),
});

const clearFilters = () => {
  productsStore.setSearchQuery('');
  productsStore.setSelectedCategory('');
};

onMounted(() => {
  productsStore.fetchProducts();
});
</script>
