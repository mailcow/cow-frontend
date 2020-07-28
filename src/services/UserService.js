import Vue from 'vue';
import { API_BASE_URL } from 'mailcow-config';

export default {
  login (data) {
    return Vue.axios.post(API_BASE_URL + 'auth/login/', data);
  },
  logout () {
  	return Vue.axios.post(API_BASE_URL + 'auth/logout/');
  }
};
