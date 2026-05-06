<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import apiService from '../../services/api'

interface Recipe {
  id: number
  titulo: string
  descricao: string
  modoPreparo: string
  preco: number
  imageUrl?: string
  categorias?: Array<{ id: number; nome: string }>
  criador?: { id: number; nome: string }
}

const props = defineProps<{
  isAuthenticated: boolean
  userRole: 'client' | 'affiliate' | 'vendor' | 'admin'
  userName: string
}>()

const emit = defineEmits(['requestAuth', 'openProfile'])

const recipes = ref<Recipe[]>([])
const selectedCategory = ref('Todos')
const searchTerm = ref('')
const cart = ref<Recipe[]>([])
const successMessage = ref('')
const errorMessage = ref('')

const recipeCategory = (recipe: Recipe) =>
  recipe.categorias?.[0]?.nome ?? 'Sem categoria'

const categories = computed(() => [
  'Todos',
  ...Array.from(new Set(recipes.value.map(recipeCategory))).filter(Boolean)
])

const isCollaborator = computed(() =>
  ['affiliate', 'vendor', 'admin'].includes(props.userRole)
)

const filteredRecipes = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  return recipes.value.filter((recipe) => {
    const category = recipeCategory(recipe)

    const matchesCategory =
      selectedCategory.value === 'Todos' ||
      category === selectedCategory.value

    const matchesSearch =
      !query ||
      recipe.titulo.toLowerCase().includes(query) ||
      recipe.descricao.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query)

    return matchesCategory && matchesSearch
  })
})

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.preco, 0)
)

const cartCount = computed(() => cart.value.length)

const loadRecipes = async () => {
  try {
    recipes.value = await apiService.fetchRecipes()
  } catch (err) {
    console.error(err)
    errorMessage.value =
      'Não foi possível carregar as receitas. Tente novamente mais tarde.'
  }
}

onMounted(() => {
  loadRecipes()
})

const addToCart = (recipe: Recipe) => {
  cart.value.push(recipe)

  successMessage.value = `${recipe.titulo} adicionado ao carrinho!`

  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1)
}

const clearCart = () => {
  cart.value = []
}

const checkout = () => {
  if (!props.isAuthenticated) {
    emit('requestAuth')
    return
  }

  if (cart.value.length === 0) return

  console.log('Finalizando compra...', cart.value)

  successMessage.value = 'Compra realizada com sucesso!'

  clearCart()

  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-100 text-slate-900">
    <section class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 rounded-[2rem] bg-white/90 p-6 shadow-2xl shadow-pink-200/20 sm:p-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-semibold text-slate-900">Bem-vinda à loja de receitas</h1>
          </div>
     
        </div>
      </div>
    </section>

    <!-- Messages -->
    <div v-if="successMessage" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
</style>