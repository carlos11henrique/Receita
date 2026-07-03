<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Shipping Address -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Endereço de Entrega</h2>

            <div v-if="hasSavedAddress" class="rounded-lg border border-green-200 bg-green-50 p-4">
              <p class="font-semibold text-gray-800">Endereço salvo</p>
              <p class="text-gray-700 mt-2">{{ savedAddress }}</p>
              <p class="text-sm text-gray-500 mt-2">Seu endereço será usado automaticamente neste pedido.</p>
            </div>

            <form v-else class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <input
                  v-model="fullName"
                  type="text"
                  placeholder="Nome Completo"
                  class="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
                <input
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  class="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
                <input
                  v-model="phone"
                  type="tel"
                  placeholder="Telefone"
                  class="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div class="grid grid-cols-3 gap-4">
                <input
                  v-model="cep"
                  type="text"
                  placeholder="CEP"
                  @blur="searchCEP"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
                <input
                  v-model="street"
                  type="text"
                  placeholder="Rua"
                  class="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div class="grid grid-cols-3 gap-4">
                <input
                  v-model="number"
                  type="text"
                  placeholder="Número"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
                <input
                  v-model="complement"
                  type="text"
                  placeholder="Complemento"
                  class="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <input
                  v-model="city"
                  type="text"
                  placeholder="Cidade"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
                <input
                  v-model="state"
                  type="text"
                  placeholder="Estado"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>
            </form>
          </div>

          <!-- Shipping Method -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Método de Entrega</h2>

            <div class="space-y-3">
              <label class="flex items-center p-4 border-2 border-red-500 rounded-lg cursor-pointer bg-red-50">
                <input
                  v-model="shippingMethod"
                  type="radio"
                  value="standard"
                  class="w-4 h-4 text-red-500"
                />
                <span class="ml-4 flex-1">
                  <span class="font-semibold">Entrega Padrão (7-10 dias)</span>
                  <p class="text-gray-600 text-sm">Grátis</p>
                </span>
              </label>

              <label class="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                <input
                  v-model="shippingMethod"
                  type="radio"
                  value="express"
                  class="w-4 h-4 text-red-500"
                />
                <span class="ml-4 flex-1">
                  <span class="font-semibold">Entrega Expressa (3-5 dias)</span>
                  <p class="text-gray-600 text-sm">R$ 29,90</p>
                </span>
              </label>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Método de Pagamento</h2>

            <div class="space-y-3">
              <label class="flex items-center p-4 border-2 border-red-500 rounded-lg cursor-pointer bg-red-50">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="credit"
                  class="w-4 h-4 text-red-500"
                />
                <span class="ml-4 flex-1">
                  <span class="font-semibold">Cartão de Crédito</span>
                  <p class="text-gray-600 text-sm">Parcelado em até 12x</p>
                </span>
              </label>

              <label class="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="debit"
                  class="w-4 h-4 text-red-500"
                />
                <span class="ml-4 flex-1">
                  <span class="font-semibold">Cartão de Débito</span>
                </span>
              </label>

              <label class="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  value="pix"
                  class="w-4 h-4 text-red-500"
                />
                <span class="ml-4 flex-1">
                  <span class="font-semibold">PIX</span>
                  <p class="text-gray-600 text-sm">Pagamento imediato</p>
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Resumo do Pedido</h2>

            <div class="space-y-4 mb-6 border-b pb-6">
              <div class="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>R$ {{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Frete</span>
                <span>R$ {{ formatPrice(cartStore.shipping) }}</span>
              </div>
              <div class="flex justify-between text-gray-700">
                <span>Impostos</span>
                <span>R$ {{ formatPrice(cartStore.tax) }}</span>
              </div>
            </div>

            <div class="flex justify-between text-2xl font-bold text-gray-800 mb-6">
              <span>Total</span>
              <span class="text-red-500">R$ {{ formatPrice(cartStore.total) }}</span>
            </div>

            <!-- Items Summary -->
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-gray-800 mb-3">Itens</h3>
              <div class="space-y-2 max-h-40 overflow-y-auto">
                <div
                  v-for="item in cartStore.items"
                  :key="item.productId"
                  class="flex justify-between text-sm text-gray-600"
                >
                  <span>{{ item.quantity }}x {{ item.product.title }}</span>
                  <span>R$ {{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>

            <button
              @click="completeOrder"
              :disabled="isProcessing"
              class="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
            >
              {{ isProcessing ? 'Processando...' : 'Confirmar Pedido' }}
            </button>

            <RouterLink
              to="/cart"
              class="block text-center mt-4 text-red-500 hover:text-red-600 font-semibold transition"
            >
              Voltar ao Carrinho
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useCartStore } from '../stores/cart';
import { orderService } from '../services/api';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const fullName = ref('');
const email = ref('');
const phone = ref('');
const cep = ref('');
const street = ref('');
const number = ref('');
const complement = ref('');
const city = ref('');
const state = ref('');
const shippingMethod = ref('standard');
const paymentMethod = ref('credit');
const isProcessing = ref(false);

onMounted(() => {
  if (!authStore.user) return;

  fullName.value = authStore.user.name;
  email.value = authStore.user.email;
  phone.value = authStore.user.phone || '';
  cep.value = authStore.user.cep || '';
  street.value = authStore.user.street || '';
  number.value = authStore.user.number || '';
  complement.value = authStore.user.complement || '';
  city.value = authStore.user.city || '';
  state.value = authStore.user.state || '';
});

const hasSavedAddress = computed(() => {
  return (
    !!authStore.user?.cep &&
    !!authStore.user?.street &&
    !!authStore.user?.number &&
    !!authStore.user?.city &&
    !!authStore.user?.state
  );
});

const savedAddress = computed(() => {
  if (!authStore.user) return '';
  return `${authStore.user.street}, ${authStore.user.number}${authStore.user.complement ? ' - ' + authStore.user.complement : ''}, ${authStore.user.city} - ${authStore.user.state}, CEP ${authStore.user.cep}`;
});

const formatPrice = (price: number) => {
  return price.toFixed(2).replace('.', ',');
};

const searchCEP = async () => {
  // Integração com API de CEP (opcional)
  // Você pode usar um serviço como viacep.com.br
};

const completeOrder = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  isProcessing.value = true;

  try {
    if (!hasSavedAddress.value) {
      if (!cep.value || !street.value || !number.value || !city.value || !state.value) {
        alert('Por favor, preencha o endereço de entrega.');
        isProcessing.value = false;
        return;
      }

      await authStore.updateProfile({
        cep: cep.value,
        street: street.value,
        number: number.value,
        complement: complement.value,
        city: city.value,
        state: state.value,
      });
    }

    for (const item of cartStore.items) {
      await orderService.createOrder({
        customerId: authStore.user!.id,
        productId: item.productId,
        total: item.price * item.quantity,
        status: 'pending',
      });
    }

    cartStore.clearCart();
    router.push('/order-success');
  } catch (error: any) {
    console.error('Error completing order:', error);
    alert(error?.response?.data?.message || 'Erro ao processar pedido. Tente novamente.');
  } finally {
    isProcessing.value = false;
  }
};
</script>
