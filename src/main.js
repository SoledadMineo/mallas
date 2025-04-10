// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify' // ✅ Usás esta instancia

createApp(App).use(vuetify).mount('#app')
