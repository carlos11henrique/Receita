<template>
  <div class="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Login</h1>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="seu@email.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Senha</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Digite sua senha"
            />
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ authStore.error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
          >
            {{ authStore.isLoading ? 'Conectando...' : 'Fazer Login' }}
          </button>
        </form>

        <!-- Register Link -->
        <p class="text-center mt-6 text-gray-600">
          Não tem uma conta?
          <RouterLink to="/register" class="text-red-500 hover:text-red-600 font-semibold">
            Criar uma
          </RouterLink>
        </p>

        <!-- Divider -->
        <div class="mt-6 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Ou continue como</span>
          </div>
        </div>

        <!-- Guest Button -->
        <button
          type="button"
          @click="continueAsGuest"
          class="w-full mt-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 rounded-lg transition"
        >
          Continuar como Convidado
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { errorAlert, successAlert } from '../services/swal';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value);
  if (success) {
    await successAlert('Login realizado', 'Bem-vindo(a)!');
    router.push('/');
  } else {
    await errorAlert('Erro ao entrar', authStore.error || 'Verifique suas credenciais');
  }
};

const continueAsGuest = () => {
  router.push('/products');
};
</script>
