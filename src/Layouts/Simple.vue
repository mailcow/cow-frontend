<template>
  <div>
    <router-view/>
    <footer-bar></footer-bar>
  </div>
</template>
<script>

import Footer from 'mailcow-components/Layout/Footer';

export default {
  data: () => ({
  }),
  created () {
  },
  components: {
    'footer-bar': Footer
  }
};
</script>
