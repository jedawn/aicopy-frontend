import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupUmami } from './plugins/umam'

async function initApp() {
  const app = createApp(App)
  app.use(router)

  await setupUmami(router)

  app.mount('#app')
}

initApp()
