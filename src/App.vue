<template>
  <div id="app">
    <nav-bar></nav-bar>
    <!-- <navigation-menu></navigation-menu> -->
    <router-view class="main-content"/>
    <footer-bar></footer-bar>
  </div>
</template>
<script>


// import NavigationMenu from 'mailcow-components/Email/NavigationMenu';
import NavBar from 'mailcow-components/Layout/NavBar';
import Footer from 'mailcow-components/Layout/Footer';

export default {
  data: () => ({
  }),
  created () {
  },
  components: {
    'nav-bar': NavBar,
    'footer-bar': Footer,
    // 'navigation-menu': NavigationMenu
  }
};
</script>
