const state = {
  new_filter_dialog: false,
  unsaved_changes: {}
};

const actions = {
};

const mutations = {
  set_filter_dialog(state, status) {
    state.new_filter_dialog = status;
  },
  clear_unsaved_changes (state) {
    state.unsaved_changes = {};
  },
  add_to_unsaved_changes(state, item) {
    state.unsaved_changes[item.section] = {...state.unsaved_changes[item.section], ...item.data};
  },
  delete_unsaved_changes(state, section) {
    delete state.unsaved_changes[section];
  }
};

const getters = {
  filter_dialog (state) {
    return state.new_filter_dialog;
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
