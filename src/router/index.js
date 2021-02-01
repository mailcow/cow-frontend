import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'mailcow-store';

// Layouts
import Apps from 'mailcow-layouts/Apps';
import Simple from 'mailcow-layouts/Simple';

// Views & Components
import Login from 'mailcow-views/Login';
import Email from 'mailcow-views/Email';
import Calendar from 'mailcow-views/Calendar';
import Contact from 'mailcow-views/Contact';
import Settings from 'mailcow-views/Settings';
import EmailSettings from 'mailcow-components/Settings/EmailSettings';
import GeneralSettings from 'mailcow-components/Settings/GeneralSettings';
import {DEFAULT_APP} from 'mailcow-config';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/' + DEFAULT_APP,
    name: 'Home',
    component: Apps,
    meta: {
      requires_auth: true
    },
    children: [
      {
        path: 'email',
        name: 'Email',
        redirect: '/email/inbox'
      },
      {
        path: 'email/:folder/:message_id?',
        name: 'EmailFolder',
        component: Email
      },
      {
        path: 'Contact',
        name: 'Contact',
        component: Contact
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
        redirect: 'settings/general',
        children: [
          {
            path: 'general',
            name: 'GeneralSettings',
            component: GeneralSettings
          },
          {
            path: 'email',
            name: 'EmailSettings',
            component: EmailSettings
          }
        ]
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
          requires_auth: false
        }
      }
    ]
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requires_auth)) {
    if (from.name !== 'Login' && !store.getters.user_authenticated) {
      next({name: 'Login'});
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
