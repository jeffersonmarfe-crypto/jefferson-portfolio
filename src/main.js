import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import './enhancements.css'
import App from './App.vue'
import Home from './views/Home.vue'
import DemoView from './views/DemoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/projects/:slug', name: 'project-demo', component: DemoView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: (to) => to.hash ? { el: to.hash } : { top: 0 },
})

const vuetify = createVuetify({
  icons: { defaultSet: 'mdi', sets: { mdi }, aliases },
  theme: { defaultTheme: 'portfolio', themes: { portfolio: { dark: true, colors: { background: '#10251c', surface: '#183126', primary: '#bbd89a', secondary: '#8fae9b', accent: '#e9c68c' } } } },
})

createApp(App).use(router).use(vuetify).mount('#app')
