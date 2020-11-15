<template>
  <div>
    <preparing-account-modal :dialog="is_preparing_account"></preparing-account-modal>
    <navigation-menu v-show="!is_preparing_account"></navigation-menu>
    <div class="columns is-gapless is-fullheight">
      <div class="column is-4 messages is-fullheight" id="message-feed">
        <email-list></email-list>
      </div>
      <div class="column is-8 is-fullheight" id="message-pane">
        <email-content></email-content>
      </div>
    </div>
  </div>
</template>

<script>

import NavigationMenu from 'mailcow-components/Email/NavigationMenu';
import EmailList from 'mailcow-components/Email/EmailList';
import EmailContent from 'mailcow-components/Email/EmailContent';
import PreparingAccountModal from 'mailcow-components/PreparingAccountModal';

export default {
  name: 'Email',
  data: () => ({
    is_preparing_account: false
  }),
  created () {
    this.$store.dispatch('get_folders');
    this.fetch_email();

    // First login
    if (this.$store.getters.get_folders.length === 0) {
      this.is_preparing_account = true;
      setTimeout(() => {
        this.$store.dispatch('get_folders');
        this.fetch_email();
        this.is_preparing_account = false;
      }, 5000);
    }
  },
  props: {
  },
  computed: {
    active_account () {
      return this.$store.getters.active_account;
    }
  },
  methods: {
    fetch_email () {
      this.$store.commit('set_filter', {'in': this.$route.params.folder, 'limit': 20, 'offset': 0});
      this.$store.dispatch('get_total_message_count');
      this.$store.dispatch('get_messages');
    }
  },
  components: {
    'navigation-menu': NavigationMenu,
    'email-list': EmailList,
    'email-content': EmailContent,
    'preparing-account-modal': PreparingAccountModal
  },
  watch: {
    active_account () {
      this.fetch_email();
    },
    $route (to) {
      if (to.name === 'EmailFolder' && !to.params.message_id) {
        this.$store.commit('clear_selected_message');
        this.fetch_email();
        // this.$store.commit('toggle_navigation');
      }
    }
  }
}
</script>

