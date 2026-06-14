import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Tailwind CSS is currently provided via CDN during dev while PostCSS is fixed
// import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

// Import router after Pinia is registered to avoid circular init issues
const routerModule = await import('./router');
const router = routerModule.default;
app.use(router);

app.mount('#app');
