import { createRouter, createWebHistory } from 'vue-router'
import Room from '../views/Room.vue'
import RoomInfo from '../views/RoomInfo.vue'

const routes = [
  {
    path: '/',
    name: 'room',
    component: Room
  },
  {
    path: '/roomInfo/:id',
    name: 'roomInfo',
    component: RoomInfo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
