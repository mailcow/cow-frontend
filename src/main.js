import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import router from './router';
import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
