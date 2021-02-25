import {MAX_ATTACH_SIZE} from 'mailcow-config';
import SettingsService from 'mailcow-services/SettingsService';
import Vue from 'vue';

function get_local_settings () {
  let settings = localStorage.getItem('settings');
  if (settings) {
    return JSON.parse(settings);
  }
  return {};
}

const state = {
  settings: {},
  new_filter_dialog: false,
  settings_loading: false,
  unsaved_changes: null
};

const actions = {
  init_settings ({state, commit}) {
    state.settings_loading = true;
    SettingsService.settings()
      .then(resp => {
        let settings = resp.data;
        for (let section of Object.keys(settings)) {
          commit('set_section_settings', {'section': section, 'options': settings[section]})
        }
      });

    let local_settings = get_local_settings();
    for (let section in local_settings) {
      commit('set_section_settings', {'section': section, 'options': local_settings[section]})
    }

    commit('set_section_settings', {'section': 'config', 'options': {'max_attach_size': MAX_ATTACH_SIZE}});
  },
  set_new_settings ({state, commit}, item) {
    state.settings_loading = true;
    commit('add_to_unsaved_changes', item);
  }
};

const mutations = {
  set_filter_dialog(state, status) {
    state.new_filter_dialog = status;
    state.settings_loading = false;
  },
  clear_unsaved_changes (state) {
    state.unsaved_changes = null;
  },
  add_to_unsaved_changes(state, item) {
    if (!state.unsaved_changes) {
      state.unsaved_changes = {};
    }
    let op = {...state.unsaved_changes[item.section], ...item.data};
    Vue.set(state.unsaved_changes, item.section, op);
  },
  remove_to_unsaved_changes (state, item) {
    if (state.unsaved_changes && state.unsaved_changes[item.section]) {
      if (state.unsaved_changes[item.section][item.setting_name]) {
        delete state.unsaved_changes[item.section][item.setting_name];
        if (Object.keys(state.unsaved_changes[item.section]).length === 0) {
          delete state.unsaved_changes[item.section];
        }
        if (Object.keys(state.unsaved_changes).length === 0) {
          state.unsaved_changes = null;
        }
      }
    }
  },
  delete_unsaved_changes(state, section) {
    delete state.unsaved_changes[section];
  },
  set_section_settings (state, data) {
    Vue.set(state.settings, data.section, data.options);
    state.settings_loading = false;
  },
  set_local_settings (state, data) {
    let local_settings = get_local_settings();
    local_settings[data.section] = data.options;
    localStorage.setItem('settings', JSON.stringify(local_settings));
  },
  set_settings_loading_status (state, status) {
    state.settings_loading = status;
  }
};

const getters = {
  settings_email (state) {
    return state.settings;
  },
  email_settings: state => setting_type => {
    let o = [];
    if (state.settings.email) {
      o = state.settings.email[setting_type];
    }
    return o;
  },
  general_settings (state)  {
    let o = {};
    if (state.settings.general) {
      o = state.settings.general
    }
    return o;
  },
  config_settings (state) {
    let o = {};
    if (state.settings.config) {
      o = state.settings.config
    }
    return o;
  },
  filter_dialog (state) {
    return state.new_filter_dialog;
  },
  settings_loading (state) {
    return state.settings_loading;
  },
  unsaved_changes (state) {
    return state.unsaved_changes;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
