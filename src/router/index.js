import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../components/layouts/Showcase.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../components/layouts/Cart.vue')
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: () => import('../components/layouts/Showcase.vue'),
    props: { filter: 'favorite' },
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;