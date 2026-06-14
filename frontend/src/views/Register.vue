<template>
  <div class="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Criar Conta</h1>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Nome Completo</label>
            <input
              v-model="name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Seu nome"
            />
          </div>

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

          <!-- CPF (Optional) -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">CPF (Opcional)</label>
            <input
              v-model="cpf"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="000.000.000-00"
            />
          </div>

          <!-- Phone (Optional) -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Telefone (Opcional)</label>
            <input
              v-model="phone"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="(11) 99999-9999"
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
              placeholder="Digite uma senha forte"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Confirmar Senha</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Confirme sua senha"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <!-- Terms -->
          <div class="flex items-center">
            <input
              v-model="acceptTerms"
              type="checkbox"
              class="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
            />
            <label class="ml-2 text-sm text-gray-600">
              Aceito os
              <a href="#" class="text-red-500 hover:text-red-600">termos de serviço</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.isLoading || !acceptTerms"
            class="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
          >
            {{ authStore.isLoading ? 'Criando conta...' : 'Criar Conta' }}
          </button>
        </form>

        <!-- Login Link -->
        <p class="text-center mt-6 text-gray-600">
          Já tem uma conta?
          <RouterLink to="/login" class="text-red-500 hover:text-red-600 font-semibold">
            Fazer login
          </RouterLink>
        </p>
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

const name = ref('');
const email = ref('');
const cpf = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);
const error = ref('');

const handleRegister = async () => {
  error.value = '';

  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem';
    await errorAlert('Senha inválida', 'As senhas não coincidem.');
    return;
  }

  if (password.value.length < 6) {
    error.value = 'A senha deve ter no mínimo 6 caracteres';
    await errorAlert('Senha fraca', 'A senha deve ter ao menos 6 caracteres.');
    return;
  }

  const success = await authStore.register({
    name: name.value,
    email: email.value,
    password: password.value,
    cpf: cpf.value || undefined,
    phone: phone.value || undefined,
  });

  if (success) {
    await successAlert('Conta criada', 'Bem-vindo(a)! Você foi registrado com sucesso.');
    router.push('/');
  } else {
    error.value = authStore.error;
    await errorAlert('Erro ao registrar', authStore.error || 'Falha desconhecida');
  }
};
</script>
