<template>
  <b-navbar :mobile-burger="false">
    <template slot="brand">
      <b-icon @click.native="$store.dispatch('toggle_navigation')" style="margin: auto 0; cursor: pointer;" icon="menu"></b-icon>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="https://www.debinux.de/256.png" alt="MailCow">
        <h1 style="margin: auto 0px auto 5px; font-weight: 500; font-size: 20px">MAILCOW</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{'name': 'Email'}" :active="$route.name === 'Email'">
        <b-icon icon="email-open-outline"></b-icon> 
        <span class="pl-1 is-size-7">Email</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{'name': 'Contact'}" :active="$route.name === 'Contact'">
        <b-icon icon="account-box-outline"></b-icon>
        <span class="pl-1 is-size-7">Contact</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{'name': 'Calendar'}" :active="$route.name === 'Calendar'">
        <b-icon icon="calendar"></b-icon>
        <span class="pl-1 is-size-7">Calendar</span>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-dropdown
        class="mr-4"
        aria-role="list"
        style="margin: auto 0;"
      >
        <b-button size="is-small" type="button" slot="trigger">
          <template>
            <span>{{$store.getters.active_account.email}}</span>
          </template>
          <b-icon size="is-small" icon="menu-down"></b-icon>
        </b-button>
        <b-dropdown-item 
            v-for="(account) in $store.getters.accounts"
            @click="change_account(account.id)"
            :key="account.id"
            :value="account.id" 
            aria-role="listitem"
          >
            <div class="media">
              <div class="media-content">
                  <h3>{{account.email}}</h3>
              </div>
            </div>
        </b-dropdown-item>
        <b-dropdown-item 
            @click="change_account('new_account')"
            aria-role="listitem"
          >
            <div class="media">
              <div class="media-content">
                  <h3>Add New Account</h3>
              </div>
            </div>
        </b-dropdown-item>
      </b-dropdown>
      <b-icon @click.native="$store.dispatch('change_dark_mode')" style="margin: auto 0;" class="mr-4 c-pointer" icon="brightness-6"></b-icon>
      <b-icon style="margin: auto 0;" class="mr-4 c-pointer" icon="magnify"></b-icon>
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
    },
    change_account (account_id) {
      if (account_id === 'new_account') {
        this.$store.commit('account_dialog_status', true);
      } else {
        this.$store.commit('change_account', account_id);
      }
    }
  }
};
</script>
