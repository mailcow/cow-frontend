const state = {
  authenticated: false
};

const actions = {
  check_auth () {
    var jwt = localStorage.getItem('expires');
    if(jwt) {
      state.authenticated = true;
    }
    else {
      state.authenticated = false;
    }
  },
  login (state, expires) {
    localStorage.setItem('expires', expires);
    state.authenticated = true;
  },
  logout () {
    state.authenticated = false;
    localStorage.removeItem('expires');
  }
};

const getters = {
  user_authenticated () {
    return state.authenticated;
  }
};

export default {
  state,
  actions,
  getters
};
