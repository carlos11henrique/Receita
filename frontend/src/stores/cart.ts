import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { CartItem, Product } from '../types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const initializeFromStorage = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      items.value = JSON.parse(storedCart);
    }
  };

  const saveToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(items.value));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = items.value.find((item) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        productId: product.id,
        product,
        quantity,
        price: Number(product.price),
      });
    }

    saveToStorage();
  };

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter((item) => item.productId !== productId);
    saveToStorage();
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find((item) => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        saveToStorage();
      }
    }
  };

  const clearCart = () => {
    items.value = [];
    saveToStorage();
  };

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const shipping = computed(() => (subtotal.value > 0 ? 15 : 0));

  const tax = computed(() => subtotal.value * 0.1);

  const total = computed(() => subtotal.value + shipping.value + tax.value);

  return {
    items,
    totalItems,
    subtotal,
    shipping,
    tax,
    total,
    initializeFromStorage,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
