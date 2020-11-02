import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

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
    component: TableView
  },
  {
    path: '/tropicalcyclone',
    name: 'TropicalCyclone',
    component: TableView,
  },
  {
    path: '/cycloneoutlook',
    name: 'CycloneOutlook',
    component: TableView,
  },
  {
    path: '/report',
    name: 'AfterEventRerpot',
    component: TableView,
  },
  {
    path: '/annual_report',
    name: 'AnnualReport',
    component: TableView,
  },
  {
    path: '/publication',
    name: 'Publication',
    component: TableView,
  },
  {
    path: '/detail',
    name: 'DetailTropicalCyclone',
    component: DetailTropicalCyclone,
  },
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
