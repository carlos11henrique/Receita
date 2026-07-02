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
        <h3 class="text-lg font-semibold mb-4">Gerenciar Usuários</h3>
        <div v-if="loading" class="text-sm text-gray-600">Carregando usuários...</div>
        <div v-else-if="users.length === 0" class="text-sm text-gray-600">Nenhum usuário encontrado.</div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">ID</th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Nome</th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Email</th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Cargo</th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">Ban até</th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id">
                <td class="px-4 py-3 text-sm text-gray-700">{{ user.id }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ user.name }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ user.email }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  <select
                    v-model="user.role"
                    @change="updateUserRole(user, user.role)"
                    class="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="client">Cliente</option>
                    <option value="affiliate">Afiliada</option>
                    <option value="vendor">Vendedora</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  <span :class="user.isBanned ? 'text-red-600' : 'text-green-600'">
                    {{ user.isBanned ? 'Banido' : 'Ativo' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  {{ user.banUntil ? new Date(user.banUntil).toLocaleDateString() : '—' }}
                </td>
                <td class="px-4 py-3 text-right text-sm font-medium space-x-2">
                  <button
                    v-if="!user.isBanned"
                    @click="setBan(user, 7)"
                    class="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Banir 7d
                  </button>
                  <button
                    v-if="user.isBanned"
                    @click="clearBan(user)"
                    class="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Desbanir
                  </button>
                  <button
                    @click="removeUser(user)"
                    class="px-3 py-1 bg-gray-800 text-white rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mt-8 bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Status dos Produtos</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p class="text-sm text-gray-500">Pendentes</p>
            <p class="mt-2 text-3xl font-semibold text-gray-900">{{ pending.length }}</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p class="text-sm text-gray-500">Aprovados</p>
            <p class="mt-2 text-3xl font-semibold text-gray-900">{{ approvedCount }}</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p class="text-sm text-gray-500">Rejeitados</p>
            <p class="mt-2 text-3xl font-semibold text-gray-900">{{ rejectedCount }}</p>
          </div>
        </div>
      </section>

      <section class="mt-8 bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Relatórios Rápidos</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 bg-gray-50 rounded">Vendas (últimos 7 dias)</div>
          <div class="p-4 bg-gray-50 rounded">Top produtos</div>
          <div class="p-4 bg-gray-50 rounded">Afiliados</div>
        </div>
      </section>

      <section class="mt-8 bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Produtos Pendentes</h3>
        <div v-if="loading" class="text-sm text-gray-600">Carregando pendentes...</div>
        <div v-else-if="pending.length === 0" class="text-sm text-gray-600">Nenhum produto pendente.</div>
        <div v-else class="space-y-4">
          <div v-for="p in pending" :key="p.id" class="p-4 border rounded flex justify-between items-center">
            <div>
              <div class="font-semibold">{{ p.title }}</div>
              <div class="text-sm text-gray-600">{{ p.description }}</div>
            </div>
            <div class="flex gap-2">
              <button @click="approve(p.id)" class="px-3 py-1 bg-green-500 text-white rounded">Aprovar</button>
              <button @click="reject(p.id)" class="px-3 py-1 bg-red-500 text-white rounded">Rejeitar</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { productService, userService } from '../services/api';
import type { User } from '../types';

const pending = ref<any[]>([]);
const allProducts = ref<any[]>([]);
const users = ref<User[]>([]);
const loading = ref(false);

const approvedCount = computed(() => allProducts.value.filter((product) => {
  const status = product.status?.toLowerCase();
  return status === 'active';
}).length);

const rejectedCount = computed(() => allProducts.value.filter((product) => {
  const status = product.status?.toLowerCase();
  return status === 'rejected';
}).length);

const loadPending = async () => {
  loading.value = true;
  try {
    pending.value = await productService.getPendingProducts();
    allProducts.value = await productService.getAllProducts();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const loadUsers = async () => {
  loading.value = true;
  try {
    users.value = await userService.fetchUsers();
  } catch (e) {
    console.error('Erro ao carregar usuários:', e);
  } finally {
    loading.value = false;
  }
};

const updateUserRole = async (user: User, role: User['role']) => {
  try {
    await userService.updateUser(user.id, { role });
    user.role = role;
  } catch (e) {
    alert('Erro ao atualizar cargo');
  }
};

const setBan = async (user: User, days: number) => {
  const until = new Date();
  until.setDate(until.getDate() + days);
  try {
    await userService.updateUser(user.id, { isBanned: true, banUntil: until.toISOString() });
    user.isBanned = true;
    user.banUntil = until.toISOString();
  } catch (e) {
    alert('Erro ao banir usuário');
  }
};

const clearBan = async (user: User) => {
  try {
    await userService.updateUser(user.id, { isBanned: false, banUntil: null });
    user.isBanned = false;
    user.banUntil = undefined;
  } catch (e) {
    alert('Erro ao desbanir usuário');
  }
};

const removeUser = async (user: User) => {
  if (!confirm(`Tem certeza que deseja excluir ${user.name}?`)) return;
  try {
    await userService.deleteUser(user.id);
    users.value = users.value.filter((u) => u.id !== user.id);
  } catch (e) {
    alert('Erro ao excluir usuário');
  }
};

const approve = async (id: number) => {
  try {
    await productService.updateProduct(id, { status: 'active' });
    pending.value = pending.value.filter((p) => p.id !== id);
    const product = allProducts.value.find((p) => p.id === id);
    if (product) product.status = 'active';
  } catch (e) {
    alert('Erro ao aprovar');
  }
};

const reject = async (id: number) => {
  const reason = window.prompt('Motivo da rejeição (opcional):', '');
  try {
    await productService.updateProduct(id, { status: 'rejected', rejectionReason: reason || '' });
    pending.value = pending.value.filter((p) => p.id !== id);
    const product = allProducts.value.find((p) => p.id === id);
    if (product) {
      product.status = 'rejected';
      product.rejectionReason = reason || '';
    }
  } catch (e) {
    alert('Erro ao rejeitar');
  }
};

onMounted(async () => {
    await Promise.all([loadPending(), loadUsers()]);
  });
</script>

<style scoped>
</style>
