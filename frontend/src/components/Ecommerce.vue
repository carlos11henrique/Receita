<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}  

const props = defineProps<{ isAuthenticated: boolean }>();
const emit = defineEmits(['requestAuth']);

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Kit Chá Encantado',
    description: 'Aparelho elegante para preparar seu chá com charme e leveza.',
    price: 239.9,
    category: 'Bem-estar',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    name: 'Conjunto de Louças Rosé',
    description: 'Louças delicadas em tom rosé para jantares especiais.',
    price: 189.9,
    category: 'Mesa posta',
    image: 'https://images.unsplash.com/photo-1546091632-9c024ecffcb5?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    name: 'Utensílios Gourmet Premium',
    description: 'Ferramentas femininas para cozinha com acabamento dourado.',
    price: 99.9,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 4,
    name: 'Processador Pastel',
    description: 'Compacto, poderoso e perfeito para receitas rápidas.',
    price: 159.9,
    category: 'Eletrodomésticos',
    image: 'https://images.unsplash.com/photo-1513791059222-7b4f5e99c5b1?auto=format&fit=crop&w=700&q=80',
  },
]);

const categories = ref(['Todos', 'Bem-estar', 'Mesa posta', 'Acessórios', 'Eletrodomésticos']);
const selectedCategory = ref('Todos');
const searchTerm = ref('');
const cart = ref<Product[]>([]);
const successMessage = ref('');

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesCategory = selectedCategory.value === 'Todos' || product.category === selectedCategory.value;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0));

const addToCart = (product: Product) => {
  cart.value.push(product);
  successMessage.value = `${product.name} adicionado ao carrinho!`;
  setTimeout(() => { successMessage.value = ''; }, 2000);
};

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1);
};

const clearCart = () => {
  cart.value = [];
};

const checkout = () => {
  if (!props.isAuthenticated) {
    emit('requestAuth');
    return;
  }

  successMessage.value = 'Compra finalizada com sucesso! Obrigada por escolher a nossa loja.';
  cart.value = [];
  setTimeout(() => { successMessage.value = ''; }, 3000);
};
</script>
<template>
  <div class="min-h-screen bg-gray-50">

    <!-- NAVBAR -->
    <header class="bg-white border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <!-- LOGO -->
        <h1 class="text-lg font-bold">Minha Loja</h1>

        <!-- BUSCA -->
        <div class="flex-1 mx-6 hidden sm:block">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar produtos..."
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- CARRINHO -->
        <div class="relative cursor-pointer">
          🛒
          <span
            v-if="cart.length"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full"
          >
            {{ cart.length }}
          </span>
        </div>
      </div>

      <!-- BUSCA MOBILE -->
      <div class="sm:hidden px-4 pb-3">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar..."
          class="w-full border rounded-lg px-4 py-2"
        />
      </div>
    </header>

    <!-- CONTEÚDO -->
    <div class="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- PRODUTOS (8 COL) -->
      <main class="lg:col-span-8">
        <h2 class="text-xl font-semibold mb-4">Produtos</h2>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition"
          >
            <img :src="product.image" class="w-full h-40 object-cover rounded-t-xl" />

            <div class="p-4">
              <h3 class="font-medium">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">{{ product.description }}</p>

              <div class="flex justify-between items-center mt-3">
                <span class="font-bold">
                  R$ {{ product.price.toFixed(2) }}
                </span>

                <button
                  @click="addToCart(product)"
                  class="bg-black text-white px-3 py-1 rounded-md text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- PUBLICIDADE (4 COL) -->
      <aside class="lg:col-span-4 space-y-4">

        <div class="bg-white p-4 rounded-xl shadow-sm">
          <h3 class="font-semibold mb-2">Promoção</h3>
          <div class="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
            Banner
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-sm">
          <h3 class="font-semibold mb-2">Oferta do dia</h3>
          <div class="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
            Produto destaque
          </div>
        </div>

      </aside>
    </div>
  </div>
</template>