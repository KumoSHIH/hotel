import { createRouter, createWebHistory } from 'vue-router'
import Room from '../views/Room.vue'

const routes = [
  {
    path: '/',
    name: 'room',
    component: Room
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
