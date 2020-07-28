<template>
  <div>
    <mailcow-nav></mailcow-nav>
    <router-view></router-view>
  </div>
</template>
<script>

import Nav from 'mailcow-components/Layouts/Nav';

export default {
  data: () => ({
  }),
  components: {
    'mailcow-nav': Nav
  }
};
</script>
<style lang="scss">
  @import "./assets/scss/app";
</style>
