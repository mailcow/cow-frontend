const state = {
  new_mail_dialog: false,
  dark_mode: false,
  navigation_drawer: true,
  choose_email: null
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
    const html_class_name = 'nav-menu-space';
    if (!state.navigation_drawer) {
      document.documentElement.classList.add(html_class_name);
    } else {
      document.documentElement.classList.remove(html_class_name);
    }
    commit('toggle_navigation');
  }
};

const mutations = {
  change_mail_dialog (state, status) {
    state.new_mail_dialog = status;
  },
  change_dark_mode_status (state) {
    state.dark_mode = !state.dark_mode;
  },
  toggle_navigation (state) {
    state.navigation_drawer = !state.navigation_drawer;
  },
  set_choose_email (state, email) {
    state.choose_email = email;
  }
};

const getters = {
  dark_mode (state) {
    return state.dark_mode;
  },
  navigation_drawer () {
    return state.navigation_drawer;
  },
  mail_dialog (state) {
    return state.new_mail_dialog;
  },
  choose_email (state) {
    return state.choose_email;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
