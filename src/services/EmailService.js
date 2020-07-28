import Vue from 'vue';
import { API_BASE_URL } from 'mailcow-config';

export default {
  ping (data) {
    return Vue.axios.get(API_BASE_URL + 'email/');
  }
};
