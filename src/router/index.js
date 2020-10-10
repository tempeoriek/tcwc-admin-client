import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

import TableView from '../views/TableView.vue'
import DetailTropicalCyclone from '../views/DetailTropicalCyclone.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component:About
  },
  {
    path: '/tropicalcyclone',
    name: 'TropicalCyclone',
    component: TableView,
  }
  {
    path: '/cyclonename',
    name: 'CycloneName',
    component: TableView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
