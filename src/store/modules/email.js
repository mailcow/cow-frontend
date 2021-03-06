import EmailService from 'mailcow-services/EmailService';

const DEFAULT_FOLDERS = {
  inbox: { icon: 'inbox', name: 'inbox', index: 0 },
  sent: { icon: 'send', name: 'sent', index: 1 },
  starred: { icon: 'star', name: 'starred', index: 2 },
  trash: { icon: 'delete', name: 'trash', index: 3 },
  archive: { icon: 'file', name: 'archive', index: 4 },
  drafts: { icon: 'email-open', name: 'drafts', index: 5 },
  spam: { icon: 'alert-circle', name: 'spam', index: 6 }
};
var timer = null;

let filter_to_query = function (filters) {
  let res = '';
  for (let key of Object.keys(filters)) {
    let val = filters[key];
    res += (key + '=' + val + '&');
  }
  return res;
}

const state = {
  is_loading: true,
  filters: {'offset': 0, 'limit': 20},
  total_message_count: 0,
  messages: [],
  selected: [],
  folders: []
};

const actions = {
  get_messages({commit}) {
    state.is_loading = true;
    state.selected = [];
    let filter = filter_to_query(state.filters);
    if (state.filters.in === 'drafts') {
      EmailService.get_drafts(filter)
        .then(resp => {
          commit('add_messages', resp.data);
        });
    } else {
      EmailService.messages(filter)
        .then(resp => {
          commit('add_messages', resp.data);
        });
    }
  },
  get_total_message_count ({state}) {
    EmailService.messages('in=' + state.filters.in + '&view=count')
      .then(resp => {
        state.total_message_count = resp.data.count;
      });
  },
  change_page ({state, dispatch}, status) {
    if (status > 0) {
      state.filters.offset += state.filters.limit;
    } else {
      state.filters.offset -= state.filters.limit;
    }
    dispatch('get_messages');
  },
  get_folders({commit}) {
    EmailService.get_folders()
      .then(resp => {
        commit('add_folders', resp.data);
      });
  },
  update_message ({commit}, data) {
    if (!data.no_update) {
      state.is_loading = true;
    }
    EmailService.update_message(data.mail_id, data.message)
      .then(() => {
        if (!data.no_update) {
          commit('updated_message');
        }
      });
  },
  update_messages ({dispatch}, data) {
    state.selected.forEach((m) => {
      dispatch('update_message', {'mail_id': m, 'message': data});
    });
  },
  delete_draft ({commit}, draft_id) {
    EmailService.delete_draft(draft_id)
      .then(() => {
        commit('updated_message');
      });
  },
  delete_drafts ({dispatch}) {
    state.selected.forEach((m) => {
      dispatch('delete_draft', m);
    });
  }
};

const mutations = {
  add_folders (state, folders) {
    state.folders = folders;
  },
  add_messages (state, messages) {
    state.messages = messages;
    setTimeout(() => {
      state.is_loading = false;
    }, 300);
  },
  set_filter(state, filters) {
    state.filters = filters;
  },
  select_message (state, message) {
    state.selected = message;
  },
  select_all_message (state) {
    state.selected = state.messages.map(m => m.id);
  },
  clear_selected_message (state) {
    state.selected = [];
  },
  updated_message () {

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      this.dispatch('get_messages');
    }, 200)
  }
};

const getters = {
  email_is_loading () {
    return state.is_loading;
  },
  get_folders (state) {
    return state.folders;
  },
  get_all_folders (state) {
    let folders = {default: [], other: []};
    state.folders.forEach((f) => {
      if (f.name && DEFAULT_FOLDERS[f.name]) {
        let default_folder = DEFAULT_FOLDERS[f.name];
        folders.default.push({...default_folder, ...f});
      } else {
        folders.other.push(f);
      }
    });
    folders.default.sort(function(a, b) {
        return a.index - b.index;
    });
    return folders;
  },
  get_messages (state) {
    return state.messages;
  },
  get_filters (state) {
    return state.filters;
  },
  get_total_message_count (state) {
    return state.total_message_count;
  },
  get_messages_count (state) {
    return state.messages.length;
  },
  get_message: state => message_id => {
    let msg = state.messages.find((m) => {return m.id === message_id});
    return msg;
  },
  get_folder: state => folder_name => {
    let folder = state.folders.find((f) => {return f.name === folder_name || f.display_name === folder_name});
    return folder;
  },
  get_slected_messages_count (state) {
    return state.selected.length;
  },
  get_slected_messages (state) {
    return state.selected;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
