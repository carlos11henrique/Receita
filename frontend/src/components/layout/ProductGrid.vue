<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">{{ title }}</h2>
      <div class="flex items-center gap-3">
        <select v-model="sort" class="px-3 py-2 border rounded bg-white">
          <option value="new">Mais recentes</option>
          <option value="popular">Mais populares</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
        </select>
        <button @click="$emit('refresh')" class="px-3 py-2 bg-gray-100 rounded">Atualizar</button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ title?: string }>();
const title = props.title || 'Produtos';
const sort = ref('new');
</script>

<style scoped></style>
