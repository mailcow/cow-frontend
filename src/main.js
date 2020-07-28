import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import router from './router';
import store from './store';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
 
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Buefy);

axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
