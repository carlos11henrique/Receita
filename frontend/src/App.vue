<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import Login from './pages/auth/Login.vue';
import Cadastro from './pages/auth/Cadastro.vue';
import Ecommerce from './pages/ecommerce/Ecommerce.vue';
import Profile from './pages/auth/Profile.vue';

const currentPage = ref<'home' | 'profile'>('home');
const currentView = ref<'login' | 'cadastro'>('login');
const showAuthCard = ref(false);
const passwordResetMessage = ref('');
const isAuthenticated = ref(false);
const userId = ref<number | null>(null);
const userName = ref('');
const userRole = ref<'client' | 'affiliate' | 'vendor' | 'admin'>('client');
const token = ref('');
const cart = ref([]);

const goHome = () => {
  currentPage.value = 'home';
};

const openProfile = () => {
  showAuthCard.value = false;
  currentPage.value = 'profile';
};

const openAuthCard = (mode: 'login' | 'cadastro') => {
  currentView.value = mode;
  passwordResetMessage.value = '';
  showAuthCard.value = true;
};

const menuItems = computed(() => [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    command: () => goHome(),
  },
  {
    label: 'Perfil',
    icon: 'pi pi-fw pi-user',
    command: () => openProfile(),
  },
  {
    label: 'Mais',
    icon: 'pi pi-fw pi-ellipsis-h',
    items: [
      { label: 'Entrar', icon: 'pi pi-fw pi-sign-in', command: () => openAuthCard('login') },
      { label: 'Cadastrar', icon: 'pi pi-fw pi-user-plus', command: () => openAuthCard('cadastro') },
    ],
  },
]);

onMounted(() => {
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  if (storedToken && storedUser) {
    token.value = storedToken;
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

const handleLoginSuccess = (newToken: string) => {
  token.value = newToken;
  isAuthenticated.value = true;
  showAuthCard.value = false;
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

const handleForgotPassword = () => {
  passwordResetMessage.value = 'Recuperar senha ainda não está disponível aqui. Use o cadastro ou entre em contato com o suporte.';
};

const handleAuthClose = () => {
  showAuthCard.value = false;
  passwordResetMessage.value = '';
};

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  token.value = '';
  isAuthenticated.value = false;
  userId.value = null;
  userName.value = '';
  userRole.value = 'client';
  currentPage.value = 'home';
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-100 text-slate-800">
    <header class="sticky top-0 z-20 shadow-sm">
      <Menubar :model="menuItems">
        <template #start>
          <div class="flex items-center gap-3 px-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-xl font-bold text-white"></span>
            <div>
              <h1 class="text-lg font-semibold text-slate-900">Mercado de Encantos</h1>
            </div>
          </div>
        </template>
        <template #end>
          <div class="flex items-center gap-3 pr-3">
            <button class="relative rounded-full bg-rose-500 p-2 text-white hover:bg-rose-600">
              <i class="pi pi-shopping-cart"></i>
              <span v-if="cart.length" class="absolute -top-1 -right-1 rounded-full bg-red-500 px-1 text-xs">{{ cart.length }}</span>
            </button>
            <button
              v-if="!isAuthenticated"
              @click="openAuthCard('login')"
              class="rounded-full border border-pink-300 bg-white px-4 py-2 text-sm font-semibold text-pink-700 transition hover:border-pink-400 hover:bg-pink-50"
            >
              Entrar / Cadastrar
            </button>
            <div v-else class="flex items-center gap-3">
              <span class="rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">Olá, {{ userName }}</span>
              <button
                @click="handleLogout"
                class="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
              >
                Sair
              </button>
            </div>
          </div>
        </template>
      </Menubar>
    </header>

    <main>
      <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div v-if="showAuthCard" class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/40 mb-8">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.35em] text-rose-500">Autenticação</p>
              <h2 class="mt-2 text-3xl font-semibold text-slate-900">Faça login ou cadastre-se</h2>
              <p class="mt-2 text-sm text-slate-600">Digite seu email e senha abaixo. Se não tiver conta, clique em cadastrar.</p>
            </div>
            <button
              @click="handleAuthClose"
              class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Fechar
            </button>
          </div>

          <div class="mt-6">
            <Transition name="slide-fade" mode="out-in">
              <Login
                v-if="currentView === 'login'"
                @loginSuccess="handleLoginSuccess"
                @switchToRegister="currentView = 'cadastro'"
                @forgotPassword="handleForgotPassword"
              />
              <Cadastro
                v-else
                @registerSuccess="handleRegisterSuccess"
                @switchToLogin="currentView = 'login'"
              />
            </Transition>

            <div v-if="passwordResetMessage" class="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              {{ passwordResetMessage }}
            </div>
          </div>
        </div>

        <Ecommerce
          v-else-if="currentPage === 'home'"
          :is-authenticated="isAuthenticated"
          :user-role="userRole"
          :user-name="userName"
          @request-auth="openAuthCard('login')"
          @openProfile="currentPage = 'profile'"
        />

        <Profile
          v-else-if="currentPage === 'profile'"
          :user-id="userId"
          :user-name="userName"
          :user-role="userRole"
          :token="token"
          :is-authenticated="isAuthenticated"
          @back="currentPage = 'home'"
          @request-auth="openAuthCard"
        />
      </div>
    </main>
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