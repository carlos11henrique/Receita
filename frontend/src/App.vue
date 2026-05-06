<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Login from './components/login.vue';
import Cadastro from './components/cadastro.vue';
import Ecommerce from './components/Ecommerce.vue';
import Profile from './components/Profile.vue';

const currentPage = ref<'home' | 'profile'>('home');
const currentView = ref<'login' | 'cadastro'>('login');
const showAuthModal = ref(false);
const isAuthenticated = ref(false);
const userId = ref<number | null>(null);
const userName = ref('');
const userRole = ref<'client' | 'affiliate' | 'vendor' | 'admin'>('client');

onMounted(() => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  if (token && storedUser) {
    isAuthenticated.value = true;
    try {
      const data = JSON.parse(storedUser);
      userId.value = data.id ?? null;
      userName.value = data.name || '';
      userRole.value = data.role || 'client';
    } catch {
      userId.value = null;
      userName.value = '';
      userRole.value = 'client';
    }
  }
});

const handleLoginSuccess = (token: string) => {
  isAuthenticated.value = true;
  showAuthModal.value = false;
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const data = JSON.parse(storedUser);
      userId.value = data.id ?? null;
      userName.value = data.name || '';
      userRole.value = data.role || 'client';
    } catch {
      userId.value = null;
      userName.value = '';
      userRole.value = 'client';
    }
  }
};

const handleRegisterSuccess = () => {
  currentView.value = 'login';
};

const openAuthModal = (mode: 'login' | 'cadastro') => {
  currentView.value = mode;
  showAuthModal.value = true;
};

const handleAuthClose = () => {
  showAuthModal.value = false;
};

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  isAuthenticated.value = false;
  userId.value = null;
  userName.value = '';
  userRole.value = 'client';
  currentPage.value = 'home';
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-100 text-slate-800">
    <header class="sticky top-0 z-20 border-b border-white/70 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p class="text-xs uppercase tracking-[0.4em] text-pink-500">Receita</p>
          <h1 class="text-2xl font-semibold text-slate-900 sm:text-3xl">Mercado de Encantos</h1>
        </div>
        <div class="flex items-center gap-3">
          <button
            v-if="!isAuthenticated"
            @click="openAuthModal('login')"
            class="rounded-full border border-pink-300 bg-white px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm transition hover:border-pink-400 hover:bg-pink-50"
          >
            Entrar / Cadastrar
          </button>
          <div v-else class="flex items-center gap-4">
            <span class="rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">Olá, {{ userName }}</span>
            <button
              @click="handleLogout"
              class="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-600"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>

    <main>
      <Ecommerce
        v-if="currentPage === 'home'"
        :is-authenticated="isAuthenticated"
        :user-role="userRole"
        @request-auth="openAuthModal('login')"
        @openProfile="currentPage = 'profile'"
      />
      <Profile
        v-else
        :user-id="userId"
        :user-name="userName"
        :user-role="userRole"
        :is-authenticated="isAuthenticated"
        @back="currentPage = 'home'"
      />
    </main>

    <Transition name="fade">
      <div
        v-if="showAuthModal"
        class="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      >
        <div class="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          <div class="flex flex-col gap-3 border-b border-slate-200 bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-xl font-semibold text-slate-900">Acesso à sua conta</h2>
              <p class="text-sm text-slate-600">Após o login você poderá finalizar compras e acessar ofertas exclusivas.</p>
            </div>
            <button
              @click="handleAuthClose"
              class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Fechar
            </button>
          </div>

          <div class="p-6">
            <Transition name="slide-fade" mode="out-in">
              <Login
                v-if="currentView === 'login'"
                @loginSuccess="handleLoginSuccess"
                @switchToRegister="currentView = 'cadastro'"
              />
              <Cadastro
                v-else
                @registerSuccess="handleRegisterSuccess"
                @switchToLogin="currentView = 'login'"
              />
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>