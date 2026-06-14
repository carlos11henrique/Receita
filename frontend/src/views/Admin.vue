<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-6">Painel Admin</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-2">Produtos</h2>
          <p class="text-sm text-gray-600 mb-4">Gerencie catálogo, estoques e preços.</p>
          <RouterLink to="/products" class="text-red-500 hover:underline">Ir para produtos</RouterLink>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-2">Pedidos</h2>
          <p class="text-sm text-gray-600 mb-4">Visualize e atualize pedidos.</p>
          <RouterLink to="/orders" class="text-red-500 hover:underline">Ir para pedidos</RouterLink>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-2">Usuários</h2>
          <p class="text-sm text-gray-600 mb-4">Gerencie contas e permissões.</p>
          <RouterLink to="/profile" class="text-red-500 hover:underline">Gerenciar usuários</RouterLink>
        </div>
      </div>

      <section class="mt-8 bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Relatórios Rápidos</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-gray-50 rounded">Vendas (últimos 7 dias)</div>
          <div class="p-4 bg-gray-50 rounded">Top produtos</div>
          <div class="p-4 bg-gray-50 rounded">Afiliados</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Admin simple dashboard — conectar com APIs depois
</script>

<style scoped>
</style>
