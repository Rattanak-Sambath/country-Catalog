import { createWebHistory, createRouter } from 'vue-router'
// import user from './custom/user'
// import guest from './custom/guest'
import store from '../store/index'
const routes = [
    {
      path: '/',
      name: 'home.index',
      component: () => import('../view/home/index.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../../layouts/printd.vue'),
    // },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
