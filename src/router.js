import Vue from 'vue'
import VueRouter from 'vue-router'
import ProcessView from './components/ProcessView.vue'
import About from './components/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/process/:id',
    name: 'ProcessView',
    component: ProcessView
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
