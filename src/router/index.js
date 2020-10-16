import Vue from 'vue';
import VueRouter from 'vue-router';

// Layouts
import Apps from 'mailcow-layouts/Apps';
import Simple from 'mailcow-layouts/Simple';

// Views & Components
import Login from 'mailcow-views/Login';
import Email from 'mailcow-views/Email';
import Calendar from 'mailcow-views/Calendar';
import {DEFAULT_APP} from 'mailcow-config';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/' + DEFAULT_APP,
    name: 'Home',
    component: Apps,
    meta: {
      has_permission: true
    },
    children: [
      {
        path: 'email',
        name: 'Email',
        component: Email,
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar,
      }
    ]
  },
  {
    path: '',
    component: Simple,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          has_permission: false
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
