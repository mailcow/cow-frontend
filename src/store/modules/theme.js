const state = {
    dark_mode: false
};

const actions = {
    change_dark_mode ({commit}) {
      const htmlClassName = 'is-dark-mode-active';
      if (!state.dark_mode) {
        document.documentElement.classList.add(htmlClassName);
      } else {
        document.documentElement.classList.remove(htmlClassName);
      }
      commit('change_dark_mode_status');
    }
};

const mutations = {
    change_dark_mode_status (state) {
        state.dark_mode = !state.dark_mode;
    }
};

const getters = {
    dark_mode () {
        return state.dark_mode;
    }
};

export default {
  state,
  actions,
  mutations,
  getters
};
