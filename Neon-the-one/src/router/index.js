import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
        meta : { requiresAuth : false }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
        meta : { requiresAuth : false }
    },
    {
      path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
        meta : { requiresAuth : false }
    },
    {
      path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue'),
        meta : { requiresAuth : false }
    },
    {
      path: '/orders',
        name: 'orders',
        component: () => import('../views/OrderView.vue'),
      meta : { requiresAuth : true }
    },
      {
        path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
      }
  ]
})




router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth){
        if(localStorage.getItem('token')){
        next();
        }else{
        next({name: 'login'});
        }
    }else{
        next();
    }
}
);


export default router
