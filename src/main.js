import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import store from './store'
const app = createApp(App);
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import i18n from './plugins/i18n';
import router from './router'
import store from './store';
app.use(store)
app.use(Quasar)
app.use(router)
app.use(i18n)
app.mount('#app')



