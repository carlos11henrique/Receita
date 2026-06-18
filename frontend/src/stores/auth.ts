import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types';
import { authService } from '../services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string>('');
  const isLoading = ref(false);
  const error = ref<string>('');

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  const decodeJwt = (jwt: string): any | null => {
    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(payload)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  };

  const initializeFromStorage = async () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      token.value = storedToken;
      try {
        user.value = JSON.parse(storedUser);
      } catch (_) {
        user.value = null;
      }
      return;
    }

    if (storedToken && !storedUser) {
      token.value = storedToken;
      const payload = decodeJwt(storedToken);
      const userId = payload?.sub;
      if (userId) {
        try {
          const prof = await authService.getProfile(Number(userId));
          user.value = prof;
          localStorage.setItem('user', JSON.stringify(prof));
        } catch (e) {
          user.value = null;
        }
      }
    }
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = '';

    try {
      const response = await authService.login(email, password);
      token.value = response.access_token;
      user.value = response.user;

      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));

      return true;
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      error.value = serverMessage || err.message || 'Erro ao fazer login';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    cpf?: string;
    phone?: string;
  }) => {
    isLoading.value = true;
    error.value = '';

    try {
      const newUser = await authService.register(data);
      user.value = newUser;
      return true;
    } catch (err: any) {
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      error.value = serverMessage || err.message || 'Erro ao registrar';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user.value) return false;

    try {
      const updatedUser = await authService.updateProfile(user.value.id, updates);
      user.value = updatedUser;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao atualizar perfil';
      return false;
    }
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    initializeFromStorage,
    login,
    register,
    logout,
    updateProfile,
  };
});
