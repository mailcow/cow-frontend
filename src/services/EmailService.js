import Vue from 'vue';
import { API_BASE_URL } from 'mailcow-config';

export default {
  ping (data) {
    return Vue.$http.get(API_BASE_URL + 'email/');
  }
};
