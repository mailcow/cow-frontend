<template>
  <div class="modal-card" style="width: 800px;">
    <header class="modal-card-head">
      Imap/Smptp Settings
    </header>
    <section class="modal-card-body">
        <b-loading :is-full-page="false" v-model="is_loading" :can-cancel="false"></b-loading>
        <form ref="form">
          <b-field label="Email">
            <b-input
              type="email"
              placeholder="Your email"
              required
              v-model="credentials.email"
            >
            </b-input>
          </b-field>
          <b-field label="Password">
            <b-input
              type="password"
              password-reveal
              placeholder="Your password"
              required
              v-model="credentials.password"
            >
            </b-input>
          </b-field>
          <b-field grouped>
            <b-field label="Imap Host" expanded>
              <b-input
                required
                v-model="credentials.imap_server_host"
              >
              </b-input>
            </b-field>
            <b-field label="Imap Port">
              <b-input
                required
                type="number"
                v-model="credentials.imap_server_port"
              >
              </b-input>
            </b-field>
          </b-field>
          <b-field grouped>
            <b-field label="Smtp Host" expanded>
              <b-input
                required
                v-model="credentials.smtp_server_host"
              >
              </b-input>
            </b-field>
            <b-field label="Smtp Port">
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
      <button :disabled="is_loading" class="button" type="button" @click="close">Close</button>
      <button :disabled="is_loading" class="button is-primary" @click="login">Login</button>
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
            this.$buefy.toast.open({ message: 'Created new account 🎉', type: 'is-success', position: 'is-top'});
            this.is_loading = false;
            this.close();
          }).catch(() => {
            this.$buefy.toast.open({ message: 'Sorry, something went be wrong, please try later 😢', type: 'is-danger', position: 'is-top'});
            this.is_loading = false;
          });
      } else {
        this.$buefy.snackbar.open({
            duration: 2000,
            message: 'Please check form',
            type: 'is-danger',
            position: 'is-top',
            actionText: 'Close',
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