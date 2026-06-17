<template>
  <header class="sticky top-0 z-50 bg-white drop-shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3">
      <div class="flex items-center justify-between gap-4">
        <!-- left: logo + burger -->
        <div class="flex items-center gap-4">
          <button @click="toggleMobile" class="md:hidden p-2 rounded-md hover:bg-gray-100">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <RouterLink to="/" class="flex items-center gap-3 text-red-600 font-extrabold text-lg md:text-2xl">
            <span class="bg-red-100 text-red-600 rounded-full px-3 py-1 text-sm md:text-base">RC</span>
            <span class="hidden sm:inline">Receita</span>
          </RouterLink>
        </div>

        <!-- center: search -->
        <div class="flex-1 hidden md:flex justify-center">
          <div class="w-full max-w-xl">
            <label class="relative block">
              <input
                v-model="searchQuery"
                @keyup.enter="search"
                type="search"
                placeholder="Buscar receitas, ingredientes, autores..."
                class="w-full border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <button @click="search" class="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 px-3 py-1 rounded-full hover:bg-red-50">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </button>
            </label>
          </div>
        </div>

        <!-- right: links -->
        <nav class="flex items-center gap-4">
          <RouterLink to="/products" class="hidden md:inline text-gray-700 hover:text-red-600">Receitas</RouterLink>

          <RouterLink to="/cart" class="relative text-gray-700 hover:text-red-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
            </svg>
            <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{{ cartStore.totalItems }}</span>
          </RouterLink>

          <template v-if="authStore.isAuthenticated">
            <div class="relative" @mouseenter="openDropdown = true" @mouseleave="openDropdown = false">
              <button class="flex items-center gap-2 text-gray-700 hover:text-red-600">
                <svg class="w-6 h-6 rounded-full bg-gray-100 p-1 text-gray-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9a9 9 0 0118 0H3z"/></svg>
                <span class="hidden sm:inline">{{ authStore.user?.name }}</span>
              </button>
              <div v-show="openDropdown" class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2">
                <RouterLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Meu perfil</RouterLink>
                <RouterLink to="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Meus pedidos</RouterLink>
                <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sair</button>
              </div>
            </div>
          </template>

          <template v-else>
            <RouterLink to="/login" class="text-gray-700 hover:text-red-600">Entrar</RouterLink>
            <RouterLink to="/register" class="hidden md:inline bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700">Criar conta</RouterLink>
          </template>
        </nav>
      </div>

      <!-- Mobile menu -->
      <div v-show="mobileOpen" class="md:hidden mt-3">
        <div class="bg-white rounded-lg shadow p-3 space-y-2">
          <RouterLink to="/products" class="block px-3 py-2 rounded hover:bg-gray-50">Receitas</RouterLink>
          <RouterLink to="/orders" class="block px-3 py-2 rounded hover:bg-gray-50">Meus pedidos</RouterLink>
          <RouterLink to="/profile" class="block px-3 py-2 rounded hover:bg-gray-50">Meu perfil</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useCartStore } from '../../stores/cart';
import { useProductsStore } from '../../stores/products';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const productsStore = useProductsStore();
const searchQuery = ref('');
const mobileOpen = ref(false);
const openDropdown = ref(false);

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value;
};

const search = () => {
  productsStore.setSearchQuery(searchQuery.value);
  router.push('/products');
};

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>
