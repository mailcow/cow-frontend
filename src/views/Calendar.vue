<template>
  <div>
    <b-navbar style="border-bottom: 1px solid #dae1e7;">
      <template slot="brand" >
        <b-navbar-item tag="router-link" :to="{ path: '/' }" style="margin: 0px 35px">
          <img src="https://www.debinux.de/256.png" alt="MailCow">
          <h1 style="padding: 7px 10px; font-weight: 500; font-size: 20px">MAILCOW CAL</h1>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#" active>
          <b-icon icon="email-open-outline"></b-icon>
        </b-navbar-item>
        <b-navbar-item href="#">
          <b-icon icon="calendar"></b-icon>
        </b-navbar-item>
        <b-navbar-item href="#">
          <b-icon icon="checkbox-marked-outline"></b-icon>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-icon style="margin: 15px 10px 0px 0px" icon="magnify"></b-icon>
        <b-icon style="margin: 15px 10px 0px 0px" icon="bell"></b-icon>
        <figure class="image is-32x32" style="margin: 10px">
          <img style="border-radius: 50%" src="https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png">
        </figure>
      </template>
    </b-navbar>
    <div>
      CALENDAR
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
  })
};
</script>
