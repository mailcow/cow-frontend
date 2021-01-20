const state = {
  new_filter_dialog: false
};

const actions = {
};

const mutations = {
  set_filter_dialog(state, status) {
    state.new_filter_dialog = status;
  }
};

const getters = {
  filter_dialog (state) {
    return state.new_filter_dialog;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
