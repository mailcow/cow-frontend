import AccountService from 'mailcow-services/AccountService';

const state = {
  account_dialog: false,
  active_account: null,
  accounts: null
};

const actions = {
  change_account({commit, dispatch}, account_id) {
    AccountService.change_account(account_id)
      .then(() => {
        commit('change_account', account_id);
        dispatch('get_folders');
      });
  }
};

const mutations = {
  add_accounts (state, accounts) {
    state.accounts = accounts;
    localStorage.setItem('accounts', JSON.stringify(accounts));
  },
  set_active_account (state, active_account) {
    if (!active_account) {
      active_account = state.accounts.filter((ac) => {return ac.is_main})[0];
      localStorage.setItem('active', JSON.stringify(active_account));
    }
    state.active_account = active_account;
  },
  change_account (state, account_id) {
    var account = state.accounts.filter((a) => { return a.id === account_id})[0];
    state.active_account = account;
    localStorage.setItem('active', JSON.stringify(account));
  },
  account_dialog_status (state, status) {
    state.account_dialog = status;
  }
};

const getters = {
  accounts (state) {
    return state.accounts;
  },
  active_account (state) {
    return state.active_account;
  },
  account_dialog (state) {
    return state.account_dialog;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
