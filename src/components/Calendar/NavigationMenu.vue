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
    <b-menu>
        <b-menu-list label="My Calendars">
          <div class="field ml-3">
            <b-checkbox :value="true">
              <span class="subtitle is-size-6">{{$store.getters.active_account.email}}</span>
            </b-checkbox>
          </div>
          <div class="field ml-3">
            <b-icon icon="plus"></b-icon>
            <span class="subtitle">New Calendar</span>
          </div>

        </b-menu-list>
    </b-menu>
  </aside>
</template>
<script>
export default {
  data: () => ({
    date: new Date()
  })
};
</script>
