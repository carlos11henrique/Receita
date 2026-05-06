<script setup lang="ts">
import { ref } from 'vue';
import apiService from '../services/api';

const emit = defineEmits<{
  loginSuccess: [token: string];
  switchToRegister: [];
}>();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  error.value = '';

  if (!email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos.';
    return;
  }

  loading.value = true;

  try {
    const response = await apiService.login({
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));

    emit('loginSuccess', response.access_token);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao fazer login. Verifique suas credenciais.';
  } finally {
    loading.value = false;
  }
};

const switchToRegister = () => {
  emit('switchToRegister');
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="header-box">
        <p class="eyebrow">Bem-vinda de volta</p>
        <h1>Login</h1>
        <p class="subheading">Acesse sua conta para continuar comprando com carinho.</p>
      </div>

      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            v-model="email"
            :disabled="loading"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Sua senha"
            v-model="password"
            :disabled="loading"
            required
          />
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <div class="divider">ou</div>

      <button type="button" class="btn-secondary" @click="switchToRegister" :disabled="loading">
        Criar nova conta
      </button>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffefef 0%, #ffe7f9 55%, #fff8e7 100%);
  padding: 20px;
}

.auth-box {
  width: 100%;
  max-width: 430px;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 30px 80px rgba(237, 147, 169, 0.18);
  padding: 40px 32px;
  border: 1px solid rgba(249, 207, 232, 0.8);
}

.header-box {
  margin-bottom: 28px;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 6px 12px;
  border-radius: 9999px;
  background: #ffe8f1;
  color: #db2777;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 2.25rem;
  color: #1f2d3d;
}

.subheading {
  margin-top: 12px;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.65;
}

.form {
  display: grid;
  gap: 18px;
}

.form-group {
  display: grid;
  gap: 10px;
}

label {
  color: #475569;
  font-weight: 600;
  font-size: 0.94rem;
}

input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 1.25rem;
  border: 1px solid #f5d4de;
  background: #fff6fb;
  transition: all 0.25s ease;
  font-size: 0.95rem;
  color: #0f172a;
}

input:focus {
  outline: none;
  border-color: #f472b6;
  box-shadow: 0 0 0 4px rgba(251, 207, 232, 0.45);
}

.btn-primary {
  width: 100%;
  padding: 14px 18px;
  border-radius: 9999px;
  border: none;
  background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 16px 28px rgba(236, 72, 153, 0.24);
}

.btn-primary:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.btn-secondary {
  width: 100%;
  padding: 14px 18px;
  border-radius: 9999px;
  border: 1px solid #f8bbd0;
  background: #fff;
  color: #be185d;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-secondary:hover:not(:disabled) {
  background: #ffe4f1;
}

.divider {
  margin: 22px 0;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

.error-message {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 12px 16px;
  border-radius: 1rem;
  border-left: 4px solid #fca5a5;
  font-size: 0.94rem;
}
</style>
