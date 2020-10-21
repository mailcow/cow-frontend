const state = {
  dark_mode: false,
  navigation_drawer: true
};

const actions = {
  change_dark_mode ({commit}) {
    const html_class_name = 'dark-mode';
    if (!state.dark_mode) {
      document.documentElement.classList.add(html_class_name);
    } else {
      document.documentElement.classList.remove(html_class_name);
    }
    commit('change_dark_mode_status');
  },
  toggle_navigation ({commit}) {
    const html_class_name = 'navigation-menu';
    if (!state.navigation_drawer) {
      document.documentElement.classList.add(html_class_name);
    } else {
      document.documentElement.classList.remove(html_class_name);
    }
    commit('toggle_navigation');
  }
};

const mutations = {
  change_dark_mode_status (state) {
    state.dark_mode = !state.dark_mode;
  },
  toggle_navigation (state) {
    state.navigation_drawer = !state.navigation_drawer;
  }
};

const getters = {
  dark_mode () {
    return state.dark_mode;
  },
  navigation_drawer () {
    return state.navigation_drawer;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
