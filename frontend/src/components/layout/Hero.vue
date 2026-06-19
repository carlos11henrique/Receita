<template>
  <section class="bg-gradient-to-r from-red-600 to-pink-500 text-white py-24">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
      <h1 class="text-4xl lg:text-6xl font-extrabold mb-4">Receitas Deliciosas</h1>
      <p class="text-lg lg:text-xl text-red-100 max-w-2xl mx-auto mb-8">
        Explore receitas criadas por cozinheiros e colaboradores — descubra, salve e peça os ingredientes.
      </p>
      <div class="flex items-center justify-center gap-4">
        <RouterLink to="/products" class="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow hover:opacity-95">
          Ver Receitas
        </RouterLink>
        
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// componente estático de hero
</script>

<style scoped></style>
