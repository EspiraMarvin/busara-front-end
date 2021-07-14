import NoInternet from "pages/auth/errors/NoInternet";
import store from "../store"

const ifNotAuthenticated = (_to, _from, next) => {
  if (!store().getters['user/isAuthenticated']) {
    next();
    return;
  }
  next('/home');
};

const ifAuthenticated = (_to, _from, next) => {
  if (store().getters['user/isAuthenticated']) {
    next();
    return;
  }
  next('/');
};

const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        name: 'Home',
        path: '/home',
        component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    beforeEnter: ifNotAuthenticated,
    children: [
      {
        path: '/',
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
