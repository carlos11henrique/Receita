<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref } from 'vue';
import apiService from '../services/api';

interface Recipe {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  imageUrl?: string;
  categorias?: Array<{ id: number; nome: string }>;
  criador?: { id: number; nome: string };
}

const props = defineProps<{
  userId: number | null;
  userName: string;
  userRole: 'client' | 'affiliate' | 'vendor' | 'admin';
  isAuthenticated: boolean;
}>();
const emit = defineEmits(['back']);

const myRecipes = ref<Recipe[]>([]);
const loading = ref(false);
const errorMessage = ref('');

const recipeCategory = (recipe: Recipe) => recipe.categorias?.[0]?.nome ?? 'Sem categoria';

const loadMyRecipes = async () => {
  if (!props.userId) {
    myRecipes.value = [];
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const recipes = await apiService.fetchRecipes();
    myRecipes.value = recipes.filter((recipe) => recipe.criador?.id === props.userId);
  } catch (err) {
    console.error(err);
    errorMessage.value = 'Não foi possível carregar suas receitas.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadMyRecipes();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-white to-amber-100 text-slate-900">
    <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-200/40 sm:p-10">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.35em] text-rose-500">Perfil</p>
            <h1 class="mt-2 text-4xl font-semibold text-slate-900">Bem-vinda, {{ props.userName || 'colaboradora' }}</h1>
            <p class="mt-2 text-sm text-slate-600">Aqui você vê suas receitas publicadas e acompanha suas compras.</p>
          </div>
          <button
            @click="emit('back')"
            class="self-start rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Voltar para loja
          </button>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <article class="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Minhas receitas</p>
                <h2 class="mt-3 text-2xl font-semibold text-slate-900">Publicações</h2>
              </div>
              <span class="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-rose-700">{{ props.userRole }}</span>
            </div>

            <div class="mt-6 space-y-4">
              <template v-if="loading">
                <p class="text-sm text-slate-500">Carregando receitas...</p>
              </template>
              <template v-else-if="errorMessage">
                <p class="text-sm text-rose-700">{{ errorMessage }}</p>
              </template>
              <template v-else-if="myRecipes.length === 0">
                <p class="text-sm leading-6 text-slate-600">Nenhuma receita encontrada. Use a loja para criar uma nova publicação quando disponível.</p>
              </template>
              <template v-else>
                <div class="space-y-4">
                  <div
                    v-for="recipe in myRecipes"
                    :key="recipe.id"
                    class="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h3 class="text-lg font-semibold text-slate-900">{{ recipe.titulo }}</h3>
                        <p class="text-sm text-slate-500">{{ recipeCategory(recipe) }}</p>
                      </div>
                      <span class="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-700">R$ {{ recipe.preco.toFixed(2) }}</span>
                    </div>
                    <p class="mt-3 text-sm leading-6 text-slate-600">{{ recipe.descricao }}</p>
                  </div>
                </div>
              </template>
            </div>
          </article>

          <article class="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Compras</p>
            <h2 class="mt-3 text-2xl font-semibold text-slate-900">Histórico</h2>
            <p class="mt-4 text-sm leading-6 text-slate-600">A funcionalidade de compras ainda será integrada. Aqui você verá as receitas que foram compradas pelo seu perfil.</p>
            <div class="mt-6 rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
              <p>Você ainda não tem compras registradas.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
