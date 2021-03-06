/* Styles */
import '@/assets/scss/main.scss';

import Vue from 'vue';
import Buefy from 'buefy';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import * as filters from './filters';
import './validate';
import i18n from './i18n';

Vue.config.productionTip = false;
Vue.use(Buefy);

// Check the user's auth status when the app starts
store.dispatch('check_auth');

axios.defaults.withCredentials = true;
axios.interceptors.response.use( response => { 
    return response;
  }, error => {
    if (error.response.status === 401) {
      store.dispatch('logout');
      router.replace('Login');
    } else {
      return Promise.reject(error);
    }
  }
);

Vue.prototype.$http = axios;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

