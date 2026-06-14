import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Import views
import Home from './views/Home.vue';
import Products from './views/Products.vue';
import ProductDetail from './views/ProductDetail.vue';
import Cart from './views/Cart.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Checkout from './views/Checkout.vue';
import OrderSuccess from './views/OrderSuccess.vue';
import Orders from './views/Orders.vue';
import Profile from './views/Profile.vue';
import Admin from './views/Admin.vue';
import Collaborator from './views/Collaborator.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true },
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccess,
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/collaborator',
    name: 'Collaborator',
    component: Collaborator,
    meta: { requiresAuth: true, role: 'collaborator' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Route guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
