const state = {
  authenticated: false,
  active_account: null,
  accounts: null
};

const actions = {
  check_auth () {

    var jwt = localStorage.getItem('expires');
    var accounts = JSON.parse(localStorage.getItem('accounts'));
    var active_account = JSON.parse(localStorage.getItem('active'));

    if(jwt && accounts) {
      state.authenticated = true;
      state.accounts = accounts;
      if (!active_account) {
        active_account = accounts.filter((a) => {return a.is_main})[0];
        localStorage.setItem('active', JSON.stringify(active_account));
      }

      state.active_account = active_account;
    }
    else {
      state.authenticated = false;
    }
  },
  login ({commit}, data) {
    var active_account = data.user_accounts.filter((a) => {return a.is_main})[0];
    localStorage.setItem('expires', data.expires);
    localStorage.setItem('accounts', JSON.stringify(data.user_accounts));
    localStorage.setItem('active', JSON.stringify(state.active_account));
    commit('add_auth_data', active_account, data.user_accounts)
  },
  logout () {
    state.authenticated = false;
    localStorage.removeItem('expires');
    localStorage.removeItem('active');
    localStorage.removeItem('accounts');
  }
};

const mutations = {
  add_auth_data (active_account, user_accounts) {
    state.active_account = active_account;
    state.accounts = user_accounts;
    state.authenticated = true;
  },
  change_account (state, account_id) {
    var account = state.accounts.filter((a) => { return a.id === account_id})[0];
    state.active_account = account;
    localStorage.setItem('active', JSON.stringify(account));
  }
};

const getters = {
  user_authenticated (state) {
    return state.authenticated;
  },
  accounts (state) {
    return state.accounts;
  },
  active_account (state) {
    return state.active_account;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
