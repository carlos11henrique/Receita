import { createApp } from 'vue'
import App from './App.vue'


import PrimeVue from 'primevue/config'

// import Aura from '@primeuix/themes/aura'

// Componentes
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'

// Estilos
import 'primeicons/primeicons.css'
import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue as any)

// Registro global
app.component('Menubar', Menubar)
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Dialog', Dialog)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)

app.mount('#app')