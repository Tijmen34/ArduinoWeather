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
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: "graphs",
          name: "graphs",
          component: () => import('./views/GraphView.vue')
        },
        {
          path: "current",
          name: "current",
          component: () => import('./views/CurrentView.vue')
        }
      ]
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
