import axios from 'axios';
import { API_BASE_URL } from 'mailcow-config';

export default {
  update_settings (data) {
    return axios.put(API_BASE_URL + 'settings/', data);
  },
  settings () {
    return axios.get(API_BASE_URL + 'settings/');
  }
};
