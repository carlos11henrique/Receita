import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { User, Product, Order, LoginResponse } from '../types';
import { errorAlert, toast } from './swal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3007';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const msg = err.response?.data?.message || err.message || 'Erro na requisição';
    // show nice modal for important errors, toast for minor ones
    if (err.response && err.response.status >= 500) {
      await errorAlert('Erro do servidor', msg);
    } else if (err.response && err.response.status >= 400) {
      toast('error', msg);
    } else {
      toast('error', msg);
    }
    return Promise.reject(err);
  }
);

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
    cpf?: string;
    phone?: string;
  }): Promise<User> {
    const response = await api.post<User>('/user', data);
    return response.data;
  },

  async getProfile(id: number): Promise<User> {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
  },

  async updateProfile(id: number, data: Partial<User>): Promise<User> {
    const response = await api.patch<User>(`/user/${id}`, data);
    return response.data;
  },
};

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    const response = await api.patch<Product>(`/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

export const orderService = {
  async createOrder(data: {
    customerId: number;
    productId: number;
    affiliateId?: number;
    total: number;
    status?: string;
  }): Promise<Order> {
    const response = await api.post<Order>('/orders', data);
    return response.data;
  },

  async getOrders(): Promise<Order[]> {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  async getOrder(id: number): Promise<Order> {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
    const response = await api.patch<Order>(`/orders/${id}`, data);
    return response.data;
  },
};

export default api;
