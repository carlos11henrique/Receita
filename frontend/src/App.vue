<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Chip from 'primevue/chip'
import Card from 'primevue/card'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Message from 'primevue/message'

import Login from './pages/auth/Login.vue'
import Cadastro from './pages/auth/Cadastro.vue'
import Ecommerce from './pages/ecommerce/Ecommerce.vue'
import Profile from './pages/auth/Profile.vue'
import Admin from './pages/collaborator/Admin.vue'

// ================= STATE =================
const currentPage = ref<'home' | 'profile' | 'admin'>('home')
const currentViewIndex = ref(0)

const showAuthCard = ref(false)
const passwordResetMessage = ref('')

const isAuthenticated = ref(false)
const userId = ref<number | null>(null)
const userName = ref('')
const userRole = ref<'client' | 'affiliate' | 'vendor' | 'admin'>('client')
const token = ref('')
const cart = ref<any[]>([])

// ================= COMPUTED =================
const isAdmin = computed(() =>
  isAuthenticated.value && userRole.value === 'admin'
)

// ================= NAV =================
const goHome = () => (currentPage.value = 'home')

const openProfile = () => {
  showAuthCard.value = false
  currentPage.value = 'profile'
}

const openAdmin = () => {
  showAuthCard.value = false
  currentPage.value = 'admin'
}

const openAuthCard = (mode: 'login' | 'cadastro') => {
  currentViewIndex.value = mode === 'login' ? 0 : 1
  passwordResetMessage.value = ''
  showAuthCard.value = true
}

// ================= MENU =================
const menuItems = computed(() => {
  const items: any[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: goHome
    }
  ]

  if (isAuthenticated.value) {
    items.push(
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        command: openProfile
      }
    )

    if (isAdmin.value) {
      items.push({
        label: 'Admin',
        icon: 'pi pi-shield',
        command: openAdmin
      })
    }
  } else {
    items.push(
      {
        label: 'Entrar',
        icon: 'pi pi-sign-in',
        command: () => openAuthCard('login')
      },
      {
        label: 'Cadastrar',
        icon: 'pi pi-user-plus',
        command: () => openAuthCard('cadastro')
      }
    )
  }

  return items
})

// ================= AUTH =================
onMounted(() => {
  const tokenStorage = localStorage.getItem('token')
  const userStorage = localStorage.getItem('user')

  if (tokenStorage && userStorage) {
    token.value = tokenStorage
    isAuthenticated.value = true

    const data = JSON.parse(userStorage)
    userId.value = data.id ?? null
    userName.value = data.name ?? ''
    userRole.value = data.role ?? 'client'
  }
})

// ================= ACTIONS =================
const handleLoginSuccess = (newToken: string) => {
  token.value = newToken
  isAuthenticated.value = true
  showAuthCard.value = false

  const userStorage = localStorage.getItem('user')
  if (userStorage) {
    const data = JSON.parse(userStorage)
    userId.value = data.id ?? null
    userName.value = data.name ?? ''
    userRole.value = data.role ?? 'client'
  }
}

const handleRegisterSuccess = () => {
  currentViewIndex.value = 0
}

const handleForgotPassword = () => {
  passwordResetMessage.value =
    'Recuperação de senha ainda não implementada.'
}

const handleAuthClose = () => {
  showAuthCard.value = false
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  isAuthenticated.value = false
  token.value = ''
  userName.value = ''
  userRole.value = 'client'
  currentPage.value = 'home'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 text-slate-800">

    <!-- HEADER -->
    <Menubar :model="menuItems" class="shadow-sm border-none bg-white/80 backdrop-blur sticky top-0 z-20">

      <template #start>
        <div class="flex items-center gap-3 px-2">

          <div class="h-10 w-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-md flex items-center justify-center text-white font-bold">
          </div>

          <div class="leading-tight">
            <h1 class="text-lg font-bold text-slate-900">Mercado de Encantos</h1>
          </div>

        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-3 pr-3">

          <!-- CART -->
          <Button
            icon="pi pi-shopping-cart"
            class="p-button-text p-button-rounded relative text-slate-700"
          >
            <Badge
              v-if="cart.length"
              :value="cart.length"
              severity="danger"
              class="absolute -top-1 -right-1"
            />
          </Button>

          <!-- ADMIN -->
          <Button
            v-if="isAdmin"
            label="Admin"
            icon="pi pi-shield"
            class="p-button-sm p-button-outlined p-button-danger"
            @click="openAdmin"
          />

          <!-- LOGIN -->
          <Button
            v-if="!isAuthenticated"
            label="Entrar"
            icon="pi pi-user"
            class="p-button-sm p-button-primary"
            @click="openAuthCard('login')"
          />

          <!-- USER -->
          <div v-else class="flex items-center gap-2">
            <Chip :label="userName" icon="pi pi-user" />
            <Button
              label="Sair"
              icon="pi pi-sign-out"
              class="p-button-sm p-button-text text-rose-600"
              @click="handleLogout"
            />
          </div>

        </div>
      </template>

    </Menubar>

    <!-- MAIN -->
    <main class="mx-auto max-w-6xl px-4 py-8">

      <!-- AUTH CARD -->
      <Card
        v-if="showAuthCard"
        class="shadow-2xl rounded-3xl border border-slate-100 overflow-hidden"
      >

        <template #title>
          <div class="text-2xl font-bold text-slate-900">
            Bem-vindo 👋
          </div>
        </template>

        <template #subtitle>
          <span class="text-slate-500">
            Entre ou crie sua conta para continuar
          </span>
        </template>

        <template #content>

          <div class="flex justify-end mb-2">
            <Button
              icon="pi pi-times"
              class="p-button-text text-slate-500"
              @click="handleAuthClose"
            />
          </div>

          <TabView v-model:activeIndex="currentViewIndex">

            <TabPanel header="Login">
              <Login
                @loginSuccess="handleLoginSuccess"
                @switchToRegister="currentViewIndex = 1"
                @forgotPassword="handleForgotPassword"
              />
            </TabPanel>

            <TabPanel header="Cadastro">
              <Cadastro
                @registerSuccess="handleRegisterSuccess"
                @switchToLogin="currentViewIndex = 0"
              />
            </TabPanel>

          </TabView>

          <Message
            v-if="passwordResetMessage"
            severity="info"
            class="mt-4"
            :closable="false"
          >
            {{ passwordResetMessage }}
          </Message>

        </template>

      </Card>

      <!-- PAGES -->
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
      />

      <Admin
        v-else-if="currentPage === 'admin'"
        :user-role="userRole"
        :is-authenticated="isAuthenticated"
      />

    </main>

  </div>
</template>