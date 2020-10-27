import EmailService from 'mailcow-services/EmailService';

const state = {
  messages: [],
  folders: []
};

const actions = {

  get_messages({commit}, filter) {
    EmailService.messages(filter)
      .then(resp => {
        console.log('::: ', resp.data);
        commit('add_messages', resp.data);
      });
  },
  get_folders({commit}) {
    EmailService.get_folders()
      .then(resp => {
        commit('add_folders', resp.data);
      });
  }
};

const mutations = {
  add_folders (state, folders) {
    state.folders = folders;
  },
  add_messages (state, messages) {
    state.messages = messages;
  }
};

const getters = {
  get_folders (state) {
    return state.folders;
  },
  get_messages (state) {
    return state.messages;
  },
  get_message: state => message_id => {
    var msg = state.messages.find((m) => {return m.id === message_id});
    return msg;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
