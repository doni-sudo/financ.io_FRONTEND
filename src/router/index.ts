import { createRouter, createWebHistory } from 'vue-router'

// import NewsPage from '@/pages/NewsPage.vue'
// import PortfolioPage from '@/pages/PortfolioPage.vue'
// import ContactPage from '@/pages/ContactPage.vue'
import stocksPage from '@/pages/stocksPage.vue'

const routes = [
  { path: '/', redirect: '/stocks' },
  { path: '/news', redirect: '/stocks' },
  { path: '/portfolio', redirect: '/stocks' },
  { path: '/contact', redirect: '/stocks' },
  { path: '/stocks', component: stocksPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
