import Vue from 'vue'
import VueRouter from 'vue-router'
import ProcessView from './components/ProcessView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/process/:id',
    name: 'ProcessView',
    component: ProcessView
  }
]

const router = new VueRouter({
  routes
})

export default router
