<template>
  <div>
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
  components: {
    'navigation-menu': NavigationMenu,
  },
  methods: {
  }
}
</script>
