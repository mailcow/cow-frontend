import axios from 'axios';
import { API_BASE_URL } from 'mailcow-config';

export default {
  new_account (data) {
    return axios.post(API_BASE_URL + 'account/' ,data);
  },
  accounts () {
    return axios.get(API_BASE_URL + 'account/');
  },
  change_account (account_id) {
    return axios.post(API_BASE_URL + 'account/' ,{'account_id': account_id});
  }
}
