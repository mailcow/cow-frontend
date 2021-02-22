import axios from 'axios';
import { API_BASE_URL } from 'mailcow-config';

export default {
  ping () {
    return axios.get(API_BASE_URL + 'email/');
  },
  messages (filter) {
	return axios.get(API_BASE_URL + 'email/messages?' + filter);
  },
  get_folders () {
    return axios.get(API_BASE_URL + 'email/folders/');
  },
  new_folder (data) {
    return axios.post(API_BASE_URL + 'email/folders/', data);
  },
  rename_folder (folder_id, data) {
    return axios.put(API_BASE_URL + 'email/folders/' + folder_id, data);
  },
  delete_folder (folder_id) {
    return axios.delete(API_BASE_URL + 'email/folders/' + folder_id);
  },
  update_message (mail_id, data) {
    return axios.put(API_BASE_URL + 'email/messages/' + mail_id + '/', data);
  },
  send_message (data) {
    return axios.post(API_BASE_URL + 'email/send/', data);
  },
  uplpad_attachment (data) {
    return axios.post(API_BASE_URL + 'email/files/', data, {'Content-Type': 'multipart/form-data'});
  },
  download_attachment (file) {
    return axios.get(API_BASE_URL + 'email/files/' + file.id + '/download/', {'responseType': 'blob'});
  },
  save_draft (data) {
    if (data.object && data.object === 'draft') {
      return axios.put(API_BASE_URL + 'email/drafts/' + data.id + '/', data);
    } else {
      return axios.post(API_BASE_URL + 'email/drafts/', data);
    }
  },
  get_drafts () {
    return axios.get(API_BASE_URL + 'email/drafts/');
  },
  delete_draft (draft_id) {
    return axios.delete(API_BASE_URL + 'email/drafts/' + draft_id + '/?version=0', {'version': "0"});
  }
};
