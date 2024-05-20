import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ChatSeeker from '@/views/ChatSeeker.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserManagementView from '@/views/UserManagement.vue'
import SystemSetView from '@/views/SystemSet.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/chat',
    name: 'ChatSeeker',
    component: ChatSeeker,
  },
  {
    path: '/user',
    name: 'UserManagement',
    component: UserManagementView,
  },
  {
    path: '/system',
    name: 'SystemSetting',
    component: SystemSetView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
})

export default router
