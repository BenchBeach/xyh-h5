import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/Location',
    name: 'Location',
    component: () => import('../views/Location.vue')
  },
  {
    path: '/getlocation',
    name: 'getlocation',
    component: () => import('../views/getLocation.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
