<script setup lang="ts">
import { ref } from 'vue';
import apiService from '../services/api';

const emit = defineEmits<{
  registerSuccess: [];
  switchToLogin: [];
}>();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const role = ref<'client' | 'affiliate'>('client');
const loading = ref(false);
const error = ref('');
const success = ref('');

const validateForm = (): boolean => {
  error.value = '';

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Por favor, preencha todos os campos.';
    return false;
  }

  if (name.value.length < 3) {
    error.value = 'O nome deve ter pelo menos 3 caracteres.';
    return false;
  }

  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres.';
    return false;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não correspondem.';
    return false;
  }

  return true;
};

const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    await apiService.register({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });

    success.value = 'Conta criada com sucesso! Redirecionando para login...';

    setTimeout(() => {
      emit('registerSuccess');
    }, 1500);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.';
  } finally {
    loading.value = false;
  }
};

const switchToLogin = () => {
  emit('switchToLogin');
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="header-box">
        <p class="eyebrow">Crie sua conta</p>
        <h1>Cadastrar</h1>
        <p class="subheading">Entre para ampliar seus pedidos e ganhar ofertas especiais.</p>
      </div>

      <form @submit.prevent="handleRegister" class="form">
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Nome completo</label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              v-model="name"
              :disabled="loading"
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              v-model="password"
              :disabled="loading"
              required
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              v-model="confirmPassword"
              :disabled="loading"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="role">Tipo de conta</label>
          <select id="role" v-model="role" :disabled="loading" class="input-select">
            <option value="client">Cliente</option>
            <option value="affiliate">Afiliada</option>
          </select>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="success" class="success-message">{{ success }}</div>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Criando conta...' : 'Criar Conta' }}
        </button>
      </form>

      <div class="divider">ou</div>

      <button type="button" class="btn-secondary" @click="switchToLogin" :disabled="loading">
        Já tenho uma conta
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
  background: linear-gradient(135deg, #fff0f6 0%, #ffedf7 50%, #fff7ed 100%);
  padding: 20px;
}

.auth-box {
  width: 100%;
  max-width: 520px;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 30px 80px rgba(236, 72, 153, 0.16);
  padding: 42px 36px;
  border: 1px solid rgba(251, 207, 233, 0.8);
}

.header-box {
  margin-bottom: 28px;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 6px 12px;
  border-radius: 9999px;
  background: #ffe4f1;
  color: #db2777;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 2.25rem;
  color: #1f2937;
}

.subheading {
  margin-top: 12px;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.7;
}

.form {
  display: grid;
  gap: 18px;
}

.form-grid {
  display: grid;
  gap: 18px;
}

@media (min-width: 640px) {
  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }
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

input,
.input-select {
  width: 100%;
  padding: 14px 16px;
  border-radius: 1.25rem;
  border: 1px solid #fbdbdf;
  background: #fff6fb;
  transition: all 0.25s ease;
  font-size: 0.95rem;
  color: #0f172a;
}

input:focus,
.input-select:focus {
  outline: none;
  border-color: #ec4899;
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

.success-message {
  background-color: #ecfdf5;
  color: #065f46;
  padding: 12px 16px;
  border-radius: 1rem;
  border-left: 4px solid #6ee7b7;
  font-size: 0.94rem;
}
</style>
