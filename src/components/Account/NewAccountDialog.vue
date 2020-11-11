<template>
  <b-modal 
    v-model="dialog"
    :destroy-on-hide="false"
    :can-cancel="false"
    has-modal-card
    trap-focus
    aria-role="dialog"
    aria-modal
  >
    <template>
      <component 
        :is="step_component"
        @close="close" 
        @choose="choose_app"
      >
      </component>
    </template>
  </b-modal>
</template>
<script>

import ChooseAccount from 'mailcow-components/Account/ChooseAccount';
import ImapSmtpForm from 'mailcow-components/Account/ImapSmtpForm';

export default {
  data: () => ({
    step: 0
  }),
  methods: {
    choose_app () {
      this.step = 1;
    },
    close () {
      this.$store.commit('account_dialog_status', false);
      this.step = 0;
    }
  },
  computed: {
    dialog () {
      return this.$store.getters.account_dialog;
    },
    step_component () {
      const steps = {
        0: 'choose-account',
        1: 'imap-smtp-form'
      };
      return steps[this.step];
    }
  },
  components: {
    'choose-account': ChooseAccount,
    'imap-smtp-form': ImapSmtpForm
  }
};
</script>
