<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Meu Perfil</h1>

      <div v-if="!authStore.isAuthenticated" class="text-center py-12">
        <p class="text-gray-600 text-lg mb-4">Você precisa estar logado</p>
        <RouterLink
          to="/login"
          class="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Fazer Login
        </RouterLink>
      </div>

      <div v-else class="bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="updateProfile" class="space-y-6">
          <!-- Profile Picture -->
          <div class="flex items-center gap-6 pb-6 border-b">
            <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-gray-800">{{ authStore.user?.name }}</p>
              <p class="text-gray-600 text-sm">{{ authStore.user?.role }}</p>
            </div>
          </div>

          <!-- Personal Info -->
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-4">Informações Pessoais</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Nome</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">CPF</label>
                <input
                  v-model="form.cpf"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Telefone</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <!-- Account Type -->
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600">Tipo de Conta</p>
            <p class="font-semibold text-gray-800 capitalize">{{ authStore.user?.role }}</p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
          >
            {{ isLoading ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </form>

        <!-- Logout Button -->
        <button
          @click="logout"
          class="w-full mt-4 border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-2 rounded-lg transition"
        >
          Sair da Conta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const error = ref('');

const form = reactive({
  name: '',
  email: '',
  cpf: '',
  phone: '',
});

onMounted(() => {
  if (authStore.user) {
    form.name = authStore.user.name;
    form.email = authStore.user.email;
    form.cpf = authStore.user.cpf || '';
    form.phone = authStore.user.phone || '';
  }
});

const updateProfile = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    const success = await authStore.updateProfile({
      name: form.name,
      cpf: form.cpf,
      phone: form.phone,
    });

    if (success) {
      alert('Perfil atualizado com sucesso!');
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao atualizar perfil';
  } finally {
    isLoading.value = false;
  }
};

const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>
