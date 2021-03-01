<template>
  <div>
    <b-loading :is-full-page="true" v-model="is_loading" :can-cancel="false"></b-loading>
    <navigation-menu></navigation-menu>
    <div class="settings-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import NavigationMenu from 'mailcow-components/Settings/NavigationMenu';

export default {
  name: 'Settings',
  data: () => ({
  }),
  created () {
    this.$store.dispatch('init_settings');
  },
  computed: {
    is_loading: {
      get () {
        return this.$store.getters.settings_loading;
      }
    }
  },
  components: {
    'navigation-menu': NavigationMenu,
  },
  methods: {
  }
}
</script>
