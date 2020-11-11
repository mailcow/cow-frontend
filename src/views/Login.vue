<template>
  <div class="login-main">
    <b-loading :is-full-page="true" v-model="is_loading" :can-cancel="true"></b-loading>
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-8 is-offset-2 login-panel">
          <div class="columns">
            <div class="column left is-hidden-touch">
              <h1 class="title is-1">Welcome to Mailcow!</h1>
              <h2 class="subtitle colored is-4">
                Easy way of manage your emails
              </h2>
              <p>Mailcow is a Docker based email server which provides an elegant web interface for managing domains</p>
            </div>
            <div class="column right has-text-centered">
              <img width="60" src="https://www.debinux.de/256.png" alt="MailCow"/>
              <p class="description">Login mailcow</p>
              <form @keyup.enter="login">
                <b-field>
                    <b-input placeholder="Email Adress"
                        required
                        v-model="login_data.email"
                        type="email"
                        icon="email"
                        >
                    </b-input>
                </b-field>
                <b-field>
                    <b-input placeholder="Password"
                        required
                        v-model="login_data.password"
                        type="password"
                        icon="lock"
                        password-reveal
                    >
                    </b-input>
                </b-field>
                <b-button @click="login" type="is-primary" expanded>Login</b-button>
                <br />
                <small><em>Forget my password?</em></small>
              </form>
            </div>
          </div>
        </div>
        <div class="column is-8 is-offset-2">
          <br>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <b-icon icon="github"></b-icon>&emsp;
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import UserService from 'mailcow-services/UserService';

export default {
  data: () => ({
    is_loading: false,
    login_data: {
      email: '',
      password: ''
    }
  }),
  created () {
  },
  methods: {
    show_error_dialog () {
      this.is_loading = false;
      this.$buefy.dialog.alert({
          title: 'Error',
          message: 'Please check your <b>email address</b> or <b>password</b>',
          type: 'is-danger',
          hasIcon: true,
          icon: 'alert-circle',
          ariaRole: 'alertdialog',
          ariaModal: true
      });
    },
    login () {
      this.is_loading = true;
      if (this.login_data.email && this.login_data.password) {
        UserService.login(this.login_data)
          .then(resp => {
            this.$store.dispatch('login', resp.data);
            this.is_loading = false;
            this.$buefy.toast.open({ message: 'Welcome to Mailcow', type: 'is-success', position: 'is-bottom-right'});
            this.$router.push({'name': 'Home', 'params': {'folder': 'inbox'}});
          }).catch (err => {
            console.log('Login Failed ', err);
            this.show_error_dialog();
          });
      } else {
        this.show_error_dialog();
      }
    }
  }
};
</script>