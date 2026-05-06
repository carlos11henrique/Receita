<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import apiService from '../../services/api'

interface Recipe {
  id: number
  titulo: string
  descricao: string
  preco: number
  imageUrl?: string
  categorias?: Array<{ id: number; nome: string }>
  criador?: { id: number; nome: string }
}

const props = defineProps<{
  userId: number | null
  userName: string
  userRole: 'client' | 'affiliate' | 'vendor' | 'admin'
  token: string
  isAuthenticated: boolean
}>()

const emit = defineEmits<{
  back: []
  requestAuth: ['login' | 'cadastro']
}>()

const myRecipes = ref<Recipe[]>([])
const loading = ref(false)
const errorMessage = ref('')

const recipeCategory = (recipe: Recipe) =>
  recipe.categorias?.[0]?.nome ?? 'Sem categoria'

const roleLabel = computed(() => {
  switch (props.userRole) {
    case 'affiliate':
      return 'Colaboradora'
    case 'vendor':
      return 'Vendedora'
    case 'admin':
      return 'Administrador'
    default:
      return 'Cliente'
  }
})

const tokenPreview = computed(() => {
  if (!props.token) {
    return 'Sem token disponível'
  }
  return `${props.token.slice(0, 24)}...${props.token.slice(-12)}`
})

const loadMyRecipes = async () => {
  if (!props.userId) {
    myRecipes.value = []
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const recipes = await apiService.fetchRecipes()

    myRecipes.value = recipes.filter(
      (recipe) => recipe.criador?.id === props.userId
    )
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Não foi possível carregar suas receitas.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMyRecipes()
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
              Perfil
            </p>

            <h1 class="mt-2 text-4xl font-semibold text-slate-900">
              {{ props.isAuthenticated ? `Bem-vinda, ${props.userName || 'Usuária'}` : 'Perfil de usuário' }}
            </h1>

            <p class="mt-2 text-sm text-slate-600">
              {{ props.isAuthenticated ? 'Aqui você vê suas receitas publicadas e acompanha suas compras.' : 'Faça login para acessar suas informações e receitas.' }}
            </p>
          </div>

          <button
            @click="emit('back')"
            class="self-start rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Voltar para loja
          </button>

        </div>

        <div v-if="!props.isAuthenticated" class="mt-8 rounded-[2rem] border border-rose-200 bg-rose-50 p-6 text-slate-900 shadow-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.35em] text-rose-500">Você não está logada</p>
          <p class="mt-3 text-base text-slate-700">Para acessar seu perfil, faça login ou crie sua conta.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <button
              @click="emit('requestAuth', 'login')"
              class="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Entrar
            </button>
            <button
              @click="emit('requestAuth', 'cadastro')"
              class="rounded-full border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
            >
              Cadastrar
            </button>
          </div>
        </div>

        <div v-else class="grid gap-6">
          <article class="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Informações do perfil
            </p>

            <div class="mt-4 space-y-4">
              <div>
                <p class="text-sm text-slate-500">Nome</p>
                <p class="mt-1 text-xl font-semibold text-slate-900">{{ props.userName || 'Usuária' }}</p>
              </div>

   
              <div>
                <p class="text-sm text-slate-500">ID do usuário</p>
                <p class="mt-1 text-lg font-medium text-slate-700">{{ props.userId ?? '-' }}</p>
              </div>
            </div>
          </article>
        </div>

        <!-- CONTENT -->
        <div class="grid gap-6 lg:grid-cols-2">

          <!-- MINHAS RECEITAS -->
          <article class="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">

            <div class="flex items-center justify-between gap-4">

              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Minhas receitas
                </p>

                <h2 class="mt-3 text-2xl font-semibold text-slate-900">
                  Publicações
                </h2>
              </div>

            

            </div>

            <div class="mt-6 space-y-4">

              <!-- LOADING -->
              <p v-if="loading" class="text-sm text-slate-500">
                Carregando receitas...
              </p>

              <!-- ERROR -->
              <p v-else-if="errorMessage" class="text-sm text-rose-700">
                {{ errorMessage }}
              </p>

              <!-- EMPTY -->
              <p v-else-if="myRecipes.length === 0" class="text-sm text-slate-600">
                Nenhuma receita encontrada.
              </p>

              <!-- LIST -->
              <div v-else class="space-y-4">

                <div
                  v-for="recipe in myRecipes"
                  :key="recipe.id"
                  class="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm"
                >

                  <div class="flex items-start justify-between gap-4">

                    <div>
                      <h3 class="text-lg font-semibold text-slate-900">
                        {{ recipe.titulo }}
                      </h3>

                      <p class="text-sm text-slate-500">
                        {{ recipeCategory(recipe) }}
                      </p>
                    </div>

                    <span class="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-700">
                      R$ {{ Number(recipe.preco ?? 0).toFixed(2) }}
                    </span>

                  </div>

                  <p class="mt-3 text-sm text-slate-600">
                    {{ recipe.descricao }}
                  </p>

                </div>

              </div>

            </div>
          </article>

          <!-- HISTÓRICO -->
          <article class="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">

            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Compras
            </p>

            <h2 class="mt-3 text-2xl font-semibold text-slate-900">
              Histórico
            </h2>

            <p class="mt-4 text-sm text-slate-600">
              A funcionalidade de compras ainda será integrada.
            </p>

            <div class="mt-6 rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
              <p>Você ainda não tem compras registradas.</p>
            </div>

          </article>

        </div>

      </div>

    </section>

  </div>
</template>

<style scoped>
</style>