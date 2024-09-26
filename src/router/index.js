import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlatelistView from '../views/PlatelistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/detail',
      name: 'home',
      component: HomeView,
      query: {
        mid: '',
        c: ''
      },
    },
    {
      path: '/',
      name: 'plateList',
      component: PlatelistView,
      props: {
        query: {
          mid: '',
          c: ''
        },
      },
    }
  ]
})

export default router
