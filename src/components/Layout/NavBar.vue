<template>
  <b-navbar :mobile-burger="false">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="https://www.debinux.de/256.png" alt="MailCow">
        <h1 style="margin: auto 0px auto 10px; font-weight: 500; font-size: 20px">MAILCOW</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#" active>
        <b-icon icon="email-open-outline"></b-icon> 
        <span class="pl-1 is-size-7">Email</span>
      </b-navbar-item>
      <b-navbar-item href="#">
        <b-icon icon="account-box-outline"></b-icon>
        <span class="pl-1 is-size-7">Contact</span>
      </b-navbar-item>
      <b-navbar-item href="#">
        <b-icon icon="calendar"></b-icon>
        <span class="pl-1 is-size-7">Calendar</span>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-select
          style="margin: auto 0;"
          class="mr-4"
          placeholder="Small"
          size="is-small"
          v-model="test"
          expanded>
          <option value="ahmet@mailcow.com">ahmet@mailcow.com</option>
          <option value="ahmet@gmail.com">ahmet@gmail.com</option>
      </b-select>
      <b-icon @click.native="$store.dispatch('change_dark_mode')" style="margin: auto 0;" class="mr-4" icon="brightness-6"></b-icon>
      <b-icon style="margin: auto 0;" class="mr-4" icon="magnify"></b-icon>
      <b-dropdown position="is-bottom-left" aria-role="menu" append-to-body class="mr-4" style="margin: auto 0; cursor: pointer;">
          <figure class="image is-32x32"  slot="trigger">
            <img style="border-radius: 50%" src="https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png">
          </figure>
          <b-dropdown-item custom aria-role="menuitem">
              Ahmet Küçük
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
              <b-icon icon="account-cog" size="is-small"></b-icon>
              Settings
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" @click="logout">
              <b-icon icon="logout" size="is-small"></b-icon>
              Logout
          </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-navbar>
</template>
<script>

import UserService from 'mailcow-services/UserService';

export default {
  data: () => ({
    test: 'ahmet@mailcow.com'
  }),
  methods: {
    logout () {
      UserService.logout()
        .then(() => {
          this.$store.dispatch('logout');
          this.$router.replace({'name': 'Login'});
        }).catch (err => {
          console.log('Login Failed ', err);
        });
    }
  }
};
</script>
