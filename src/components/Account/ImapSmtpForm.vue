<template>
  <div class="modal-card" style="width: 800px;">
    <header class="modal-card-head">
      {{$t('ImapSmtpDialog.title')}}
    </header>
    <section class="modal-card-body">
        <b-loading :is-full-page="false" v-model="is_loading" :can-cancel="false"></b-loading>
        <form ref="form">
          <b-field :label="$t('ImapSmtpDialog.email')">
            <b-input
              type="email"
              :placeholder="$t('ImapSmtpDialog.your_email')"
              required
              v-model="credentials.email"
            >
            </b-input>
          </b-field>
          <b-field :label="$t('ImapSmtpDialog.password')">
            <b-input
              type="password"
              password-reveal
              :placeholder="$t('ImapSmtpDialog.your_password')"
              required
              v-model="credentials.password"
            >
            </b-input>
          </b-field>
          <b-field grouped>
            <b-field :label="$t('ImapSmtpDialog.imap_host')" expanded>
              <b-input
                required
                v-model="credentials.imap_server_host"
              >
              </b-input>
            </b-field>
            <b-field :label="$t('ImapSmtpDialog.imap_port')">
              <b-input
                required
                type="number"
                v-model="credentials.imap_server_port"
              >
              </b-input>
            </b-field>
          </b-field>
          <b-field grouped>
            <b-field :label="$t('ImapSmtpDialog.smtp_host')" expanded>
              <b-input
                required
                v-model="credentials.smtp_server_host"
              >
              </b-input>
            </b-field>
            <b-field :label="$t('ImapSmtpDialog.smtp_port')">
              <b-input
                required
                type="number"
                v-model="credentials.smtp_server_port"
              >
              </b-input>
            </b-field>
          </b-field>
        </form>
      
    </section>
    <footer class="modal-card-foot">
      <button :disabled="is_loading" class="button" type="button" @click="close">{{$t('ImapSmtpDialog.close')}}</button>
      <button :disabled="is_loading" class="button is-primary" @click="login">{{$t('ImapSmtpDialog.login')}}</button>
    </footer>
  </div>
</template>
<script>

import AccountService from 'mailcow-services/AccountService';

export default {
  data: () => ({
    credentials: {account_type: 'generic', imap_secure: true, smtp_secure: true},
    is_loading: false
  }),
  created () {
  },
  methods: {
    login () {
      if (this.$refs.form.checkValidity()) {
        this.is_loading = true;
        AccountService.new_account(this.credentials)
          .then((resp) => {
            this.$store.commit('add_accounts', resp.data.user_accounts);
            this.$buefy.toast.open({ message: this.$t('ImapSmtpDialog.messages.created'), type: 'is-success', position: 'is-top'});
            this.is_loading = false;
            this.close();
          }).catch(() => {
            this.$buefy.toast.open({ message: this.$t('ImapSmtpDialog.messages.error'), type: 'is-danger', position: 'is-top'});
            this.is_loading = false;
          });
      } else {
        this.$buefy.snackbar.open({
            duration: 2000,
            message: this.$t('ImapSmtpDialog.messages.check_form'),
            type: 'is-danger',
            position: 'is-top',
            actionText: this.$t('ImapSmtpDialog.messages.close'),
            queue: false
        });
      }
    },
    close () {
      this.$emit('close');
      this.credentials = {account_type: 'generic', imap_secure: true, smtp_secure: true};
      this.$refs.form.reset();
    }
  }
};
</script>