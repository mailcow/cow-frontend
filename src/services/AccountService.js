import axios from 'axios';
import { API_BASE_URL } from 'mailcow-config';

export default {
  new_account (data) {
    return axios.post(API_BASE_URL + 'account/' ,data);
  }
}
