import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Aura from '@primeuix/themes/aura' // tema moderno

import 'primeicons/primeicons.css'
import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.component('Menubar', Menubar)
app.component('Button', Button)

app.mount('#app')