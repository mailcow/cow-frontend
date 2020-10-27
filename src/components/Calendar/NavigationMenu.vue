<template>
  <aside class="navigation-drawer" :class="{'open': $store.getters.navigation_drawer}">
    <div class="block" style="padding: 1rem; margin-bottom: 0;">
      <b-button type="is-primary" expanded icon-left="pencil">NEW EVENT</b-button>
    </div>
    <b-datepicker v-model="date"
        class="sidemenu-calendar"
        size="is-small"
        locale="tr"
        inline 
        :first-day-of-week="1"
        >
    </b-datepicker>
  </aside>
</template>
<script>
export default {
  data: () => ({
    date: new Date()
  })
};
</script>
