import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types';
import { productService } from '../services/api';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string>('');
  const searchQuery = ref('');
  const selectedCategory = ref<string>('');

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value;
      return matchesSearch && matchesCategory;
    });
  });

  const categories = computed(() => {
    const cats = new Set(products.value.map((p) => p.category).filter(Boolean));
    return Array.from(cats);
  });

  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = '';

    try {
      products.value = await productService.getAllProducts();
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar produtos';
    } finally {
      isLoading.value = false;
    }
  };

  const getProduct = async (id: number): Promise<Product | null> => {
    try {
      return await productService.getProduct(id);
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar produto';
      return null;
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const setSelectedCategory = (category: string) => {
    selectedCategory.value = category;
  };

  return {
    products,
    filteredProducts,
    categories,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    fetchProducts,
    getProduct,
    setSearchQuery,
    setSelectedCategory,
  };
});
