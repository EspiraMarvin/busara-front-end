import NoInternet from "pages/auth/errors/NoInternet";
import store from "../store"

const ifNotAuthenticated = (_to, _from, next) => {
  if (!store().getters['user/isAuthenticated']) {
    console.log('is not authenticated', store().getters['user/isAuthenticated'])
    next();
    return;
  }
  next('/home');
};

const ifAuthenticated = (_to, _from, next) => {
  if (store().getters['user/isAuthenticated']) {
    console.log('is  authenticated')
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    // beforeEnter: ifNotAuthenticated,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('pages/auth/Auth.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'server-error',
    path: '/error',
    component: () => import('pages/auth/errors/Error50x'),
  },
  {
    name: 'no-internet',
    path: '/offline',
    component: NoInternet,
  },
  {
    name: 'not-found',
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
