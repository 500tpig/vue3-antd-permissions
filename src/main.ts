import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import initPlugin from './plugins'
import '@/router/guard'

const app = createApp(App)
initPlugin(app)

app.use(store).use(router).mount('#app')
