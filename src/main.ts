import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { key, store } from './store'
import '../node_modules/bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'


createApp(App).use(store,key).use(router).mount('#app')
