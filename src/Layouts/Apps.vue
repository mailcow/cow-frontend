<template>
  <div>
    <nav-bar></nav-bar>
    <router-view class="main-content"/>
    <footer-bar></footer-bar>
  </div>
</template>
<script>

import NavBar from 'mailcow-components/Layout/NavBar';
import Footer from 'mailcow-components/Layout/Footer';

export default {
  data: () => ({
  }),
  created () {
  },
  components: {
    'nav-bar': NavBar,
    'footer-bar': Footer
  }
};
</script>
