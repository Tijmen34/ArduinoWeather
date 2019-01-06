import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import CurrentView from './views/CurrentView.vue'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: CurrentView
    },
    {
      path: '/graph',
      name: 'graph',
      component: () => import('./views/GraphView.vue')
    }
    // {
    //   path: '/average',
    //   name: 'average',
    //   component: () => import('./views/AverageView.vue')
    // }
    // {
    //   path: '*',
    //   name: '404',
    //   component: () => import('./views/404.vue')
    // }
  ]
})
