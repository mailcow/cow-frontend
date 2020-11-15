const state = {
  first_login: false,
  authenticated: false
};

const actions = {
  check_auth ({commit}) {

    var jwt = localStorage.getItem('expires');
    var accounts = JSON.parse(localStorage.getItem('accounts'));
    var active_account = JSON.parse(localStorage.getItem('active'));

    if(jwt && accounts) {
      commit('add_accounts', accounts);
      commit('set_active_account', active_account);
      state.authenticated = true;
    }
    else {
      state.authenticated = false;
    }
  },
  login ({commit}, data) {
    localStorage.setItem('expires', data.expires);
    commit('add_accounts', data.user_accounts);
    commit('set_active_account', undefined); // undefined means default 
    commit('change_auth_status', true);
  },
  logout () {
    state.authenticated = false;
    localStorage.removeItem('expires');
    localStorage.removeItem('active');
    localStorage.removeItem('accounts');
  }
};

const mutations = {
  change_auth_status (status) {
    state.authenticated = status;
  },
  change_first_login (state, status) {
    state.first_login = status;
  }
};

const getters = {
  user_authenticated (state) {
    return state.authenticated;
  },
  is_first_login (state) {
    return state.first_login;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
