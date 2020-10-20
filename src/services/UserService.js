import axios from 'axios';
import { API_BASE_URL } from 'mailcow-config';

export default {
  login (data) {
    return axios.post(API_BASE_URL + 'auth/login/', data);
  },
  logout () {
    return axios.post(API_BASE_URL + 'auth/logout/');
  }
};
