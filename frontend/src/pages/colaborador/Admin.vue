<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import apiService from '../../services/api'

interface User {
  id: number
  name: string
  email: string
  role: 'client' | 'affiliate' | 'vendor' | 'admin'
  createdAt: string
}

interface Recipe {
  id: number
  titulo: string
  descricao: string
  preco: number
  criador?: { id: number; nome: string }
}

const users = ref<User[]>([])
const recipes = ref<Recipe[]>([])
const loading = ref(false)
const selectedTab = ref<'users' | 'recipes'>('users')

const userDialog = ref(false)
const editingUser = ref<User | null>(null)
const userForm = ref({
  name: '',
  email: '',
  password: '',
  role: 'client' as 'client' | 'affiliate' | 'vendor' | 'admin'
})

const roles = [
  { label: 'Cliente', value: 'client' },
  { label: 'Afiliada', value: 'affiliate' },
  { label: 'Vendedora', value: 'vendor' },
  { label: 'Admin', value: 'admin' }
]

const loadUsers = async () => {
  loading.value = true
  try {
    // Assuming there's an endpoint for fetching users
    users.value = await apiService.fetchUsers()
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
  } finally {
    loading.value = false
  }
}

const loadRecipes = async () => {
  loading.value = true
  try {
    recipes.value = await apiService.fetchRecipes()
  } catch (error) {
    console.error('Erro ao carregar receitas:', error)
  } finally {
    loading.value = false
  }
}

const openUserDialog = (user?: User) => {
  if (user) {
    editingUser.value = user
    userForm.value = { ...user, password: '' }
  } else {
    editingUser.value = null
    userForm.value = { name: '', email: '', password: '', role: 'client' }
  }
  userDialog.value = true
}

const saveUser = async () => {
  try {
    if (editingUser.value) {
      // Update user
      await apiService.updateUser(editingUser.value.id, {
        name: userForm.value.name,
        email: userForm.value.email,
        role: userForm.value.role
      })
    } else {
      // Create user
      await apiService.createUser(userForm.value)
    }
    userDialog.value = false
    loadUsers()
  } catch (error) {
    console.error('Erro ao salvar usuário:', error)
  }
}

const deleteUser = async (user: User) => {
  if (confirm(`Tem certeza que deseja deletar ${user.name}?`)) {
    try {
      await apiService.deleteUser(user.id)
      loadUsers()
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
    }
  }
}

const deleteRecipe = async (recipe: Recipe) => {
  if (confirm(`Tem certeza que deseja deletar a receita "${recipe.titulo}"?`)) {
    try {
      await apiService.deleteRecipe(recipe.id)
      loadRecipes()
    } catch (error) {
      console.error('Erro ao deletar receita:', error)
    }
  }
}

onMounted(() => {
  loadUsers()
  loadRecipes()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-amber-100 text-slate-900">
    <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-200/40 sm:p-10">
        <!-- HEADER -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.35em] text-rose-500">
              Administração
            </p>
            <h1 class="mt-2 text-4xl font-semibold text-slate-900">
              Painel do Colaborador
            </h1>
            <p class="mt-2 text-sm text-slate-600">
              Gerencie usuários e receitas do sistema.
            </p>
          </div>
        </div>

        <!-- TABS -->
        <div class="flex gap-4 border-b border-slate-200">
          <button
            @click="selectedTab = 'users'"
            :class="[
              'px-4 py-2 text-sm font-semibold transition',
              selectedTab === 'users'
                ? 'border-b-2 border-rose-500 text-rose-700'
                : 'text-slate-500 hover:text-slate-700'
            ]"
          >
            Usuários
          </button>
          <button
            @click="selectedTab = 'recipes'"
            :class="[
              'px-4 py-2 text-sm font-semibold transition',
              selectedTab === 'recipes'
                ? 'border-b-2 border-rose-500 text-rose-700'
                : 'text-slate-500 hover:text-slate-700'
            ]"
          >
            Receitas
          </button>
        </div>

        <!-- USERS TAB -->
        <div v-if="selectedTab === 'users'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-slate-900">Gerenciar Usuários</h2>
            <Button label="Novo Usuário" icon="pi pi-plus" @click="openUserDialog()" />
          </div>

          <DataTable :value="users" :loading="loading" class="p-datatable-sm">
            <Column field="id" header="ID" style="width: 80px"></Column>
            <Column field="name" header="Nome"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="role" header="Função">
              <template #body="slotProps">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold uppercase',
                  slotProps.data.role === 'admin' ? 'bg-red-100 text-red-700' :
                  slotProps.data.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                  slotProps.data.role === 'affiliate' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                ]">
                  {{ slotProps.data.role }}
                </span>
              </template>
            </Column>
            <Column header="Ações" style="width: 150px">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text p-button-sm"
                  @click="openUserDialog(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger p-button-sm ml-2"
                  @click="deleteUser(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>

        <!-- RECIPES TAB -->
        <div v-if="selectedTab === 'recipes'" class="space-y-6">
          <h2 class="text-2xl font-semibold text-slate-900">Gerenciar Receitas</h2>

          <DataTable :value="recipes" :loading="loading" class="p-datatable-sm">
            <Column field="id" header="ID" style="width: 80px"></Column>
            <Column field="titulo" header="Título"></Column>
            <Column field="descricao" header="Descrição"></Column>
            <Column field="preco" header="Preço">
              <template #body="slotProps">
                R$ {{ Number(slotProps.data.preco).toFixed(2) }}
              </template>
            </Column>
            <Column field="criador.nome" header="Criador"></Column>
            <Column header="Ações" style="width: 100px">
              <template #body="slotProps">
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger p-button-sm"
                  @click="deleteRecipe(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </section>

    <!-- USER DIALOG -->
    <Dialog v-model:visible="userDialog" header="Usuário" modal style="width: 450px">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Nome</label>
          <InputText v-model="userForm.name" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <InputText v-model="userForm.email" type="email" class="w-full" />
        </div>
        <div v-if="!editingUser">
          <label class="block text-sm font-medium text-slate-700 mb-1">Senha</label>
          <InputText v-model="userForm.password" type="password" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Função</label>
          <Dropdown v-model="userForm.role" :options="roles" option-label="label" option-value="value" class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" text @click="userDialog = false" />
        <Button label="Salvar" icon="pi pi-check" @click="saveUser" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
</style>