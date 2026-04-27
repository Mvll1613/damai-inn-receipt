import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/pages/LandingPage.vue'
import KwitansiManagementLayout from '@/layout/KwitansiManagementLayout.vue'
import AddEditKwitansiPage from '@/pages/AddEditKwitansiPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/kwitansi',
    component: KwitansiManagementLayout,
    children: [
      {
        path: 'add',
        name: 'AddEditKwitansiPage',
        component: AddEditKwitansiPage,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
