<template>
  <div id="app">
    <router-view/>
    <preparing-account-modal :dialog="is_preparing_account"></preparing-account-modal>
    <new-mail-dialog></new-mail-dialog>
    <new-account-dialog></new-account-dialog>
  </div>
</template>
<script>

import NewEmailDialog from 'mailcow-components/Email/NewEmailDialog';
import NewAccountDialog from 'mailcow-components/Account/NewAccountDialog';
import PreparingAccountModal from 'mailcow-components/PreparingAccountModal';
import { TZ } from "mailcow-config";

export default {
  data: () => ({
    is_preparing_account: false
  }),
  methods: {
    // First login
    show_preparing_dialog () {
      this.is_preparing_account = true;
      setTimeout(() => {
        this.$store.dispatch('get_folders');
        this.$store.commit('set_filter', {'in': this.$route.params.folder, 'limit': 20, 'offset': 0});
        this.$store.dispatch('get_total_message_count');
        this.$store.dispatch('get_messages');
        this.$store.commit('change_first_login', false);
        this.is_preparing_account = false;
      }, 8000);
    }
  },
  created () {
    let user_lang = (navigator.language || navigator.userLanguage).split('-')[0]; 
    if (!localStorage.getItem('settings')) {
      const timezone = TZ;
      const local_options = {lang: user_lang, timezone: timezone};
      this.$store.commit('set_local_settings', {section: 'general', options: local_options});
    } else {
      user_lang = JSON.parse(localStorage.getItem('settings')).general.lang;
    }

    this.$i18n.locale = user_lang;
    if (this.$route.name !== 'Login') {
      this.$store.dispatch('init_settings');
    }
  },
  computed: {
    first_login () {
      return this.$store.getters.is_first_login;
    }
  },
  watch: {
    first_login (val) {
      if (val) {
        this.show_preparing_dialog();
      }
    }
  },
  components: {
    'new-mail-dialog': NewEmailDialog,
    'new-account-dialog': NewAccountDialog,
    'preparing-account-modal': PreparingAccountModal
  }
};
</script>
