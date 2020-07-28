import Vue from 'vue';
import VueRouter from 'vue-router';
import Email from 'mailcow-views/Email';
import Calendar from 'mailcow-views/Calendar';
import {DEFAULT_APP} from 'mailcow-config';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/' + DEFAULT_APP,
    name: 'Home'
  },
  {
    path: '/email',
    name: 'Email',
    component: Email,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
