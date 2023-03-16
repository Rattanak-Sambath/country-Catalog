
import { createWebHistory, createRouter } from 'vue-router'
import user from './custom/user'
import guest from './custom/guest'
import store from '../store/index'
const routes = [
  {
    path: '/',
    component: () => import('../layouts/mainApp.vue') ,
    children: [
      { path: '/', redirect: { name: 'home' } },
      {
          path: '/dashboard',
          name: 'home',
          component: () => import('../view/Dashboard.vue')
      },
      
      ...user,
      ],
        meta: {
            requiresAuth: true,
        },
  },
    {
        path: '/',
        name: 'login',
        component: () => import('../view/auth/login.vue'),
        children: [
            ...guest,
        ],
        meta: {
            requiresAuth: false,
        },
    }
]

const router = createRouter({
     history: createWebHistory(),
     routes 
    })

router.beforeEach((to, from, next) => {
  const guestRoute = ['login', 'register', 'forget', 'password.reset']
  console.log(store.state.auth.authenticated);
  if (store.state.auth.authenticated ) {
    console.log('login');
        if (guestRoute.includes(to.name)) {
            router.push({ name: 'home' })
        } 
      else next()
  } else {
    if (guestRoute.includes(to.name) || to.name == 'farm.monitoring') next()
          else next({ name: 'login',query: { redirect: to.fullPath }  })
  }
})



export default router
