<script setup lang="ts">
import { ref } from 'vue'
import apiService from '../services/api'
import Swal from 'sweetalert2'

const emit = defineEmits<{
  registerSuccess: []
  switchToLogin: []
}>()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref<'client' | 'affiliate'>('client')

const loading = ref(false)
const error = ref('')

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  background: '#ffffff',
  color: '#0f172a'
})

const validateForm = (): boolean => {
  error.value = ''

  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !password.value ||
    !confirmPassword.value
  ) {
    error.value = 'Preencha todos os campos'
    return false
  }

  if (name.value.trim().length < 3) {
    error.value = 'Nome muito curto'
    return false
  }

  if (!email.value.includes('@')) {
    error.value = 'Email inválido'
    return false
  }

  if (password.value.length < 6) {
    error.value = 'Senha muito fraca'
    return false
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não conferem'
    return false
  }

  return true
}

const handleRegister = async () => {
  if (!validateForm()) {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: error.value,
      confirmButtonColor: '#ec4899'
    })
    return
  }

  loading.value = true

  try {
    const payload = {
      name: name.value.trim(),
      email: email.value.trim().toLowerCase(),
      password: password.value
    }

    await apiService.register(payload)

    await Swal.fire({
      icon: 'success',
      title: 'Conta criada!',
      html: `
        <div style="font-size:14px">
          Bem-vindo ao <b>Mercado de Encantos</b> ✨<br/>
          Sua conta foi criada com sucesso.
        </div>
      `,
      confirmButtonColor: '#ec4899',
      timer: 1800,
      showConfirmButton: false,
      background: '#fff'
    })

    emit('registerSuccess')

  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      'Erro ao criar conta'

    await Swal.fire({
      icon: 'error',
      title: 'Não foi possível cadastrar',
      html: `
        <div style="font-size:14px">
          <b>${message}</b><br/><br/>
          Verifique seus dados e tente novamente.
        </div>
      `,
      confirmButtonColor: '#f43f5e'
    })

  } finally {
    loading.value = false
  }
}

const switchToLogin = () => {
  emit('switchToLogin')
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-box">

      <div class="header-box">
        <p class="eyebrow">Criar conta</p>
        <h1>Cadastro</h1>
        <p class="subheading">
          Entre para acessar ofertas exclusivas ✨
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="form">

        <div class="form-grid">

          <div class="form-group">
            <label>Nome</label>
            <input v-model="name" type="text" :disabled="loading" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input v-model="email" type="email" :disabled="loading" />
          </div>

          <div class="form-group">
            <label>Senha</label>
            <input v-model="password" type="password" :disabled="loading" />
          </div>

          <div class="form-group">
            <label>Confirmar senha</label>
            <input v-model="confirmPassword" type="password" :disabled="loading" />
          </div>

        </div>

        <div class="form-group">
          <label>Tipo de conta</label>
          <select v-model="role" :disabled="loading">
            <option value="client">Cliente</option>
            <option value="affiliate">Afiliado</option>
          </select>
        </div>

        <button class="btn-primary" type="submit" :disabled="loading">
          {{ loading ? 'Criando conta...' : 'Criar conta' }}
        </button>

      </form>

      <div class="divider">ou</div>

      <button class="btn-secondary" @click="switchToLogin" :disabled="loading">
        Já tenho conta
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
  background: linear-gradient(135deg, #fff0f6, #fff7ed);
  padding: 20px;
}

.auth-box {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 2rem;
  padding: 40px;
  box-shadow: 0 25px 70px rgba(236, 72, 153, 0.15);
}

.header-box {
  margin-bottom: 24px;
}

.eyebrow {
  display: inline-block;
  background: #ffe4f1;
  color: #db2777;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

h1 {
  margin: 10px 0;
  font-size: 32px;
}

.subheading {
  color: #64748b;
  font-size: 14px;
}

.form {
  display: grid;
  gap: 16px;
}

.form-grid {
  display: grid;
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
select {
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #fbcfe8;
  background: #fff7fb;
}

.btn-primary {
  margin-top: 10px;
  padding: 14px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #ec4899, #f43f5e);
  color: white;
  font-weight: bold;
}

.btn-secondary {
  width: 100%;
  padding: 14px;
  border-radius: 999px;
  border: 1px solid #fbcfe8;
  background: white;
  color: #be185d;
  font-weight: bold;
}

.divider {
  text-align: center;
  margin: 18px 0;
  color: #94a3b8;
  font-size: 13px;
}
</style>