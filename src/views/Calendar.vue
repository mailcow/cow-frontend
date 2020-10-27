<template>
  <div>
    <navigation-menu></navigation-menu>
    <div class="columns is-gapless" >
      <full-calendar 
        :options="calendarOptions"
        locale="tr-tr"
        style="width: 100%;"
        />
    </div>
  </div>
</template>

<script>

import NavigationMenu from 'mailcow-components/Calendar/NavigationMenu';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  name: 'Calendar',
  data: () => ({
    calendarOptions: {
      plugins: [ dayGridPlugin, interactionPlugin ],
      initialView: 'dayGridMonth',
      events: [
        { title: 'event 1', date: '2019-04-01' },
        { title: 'event 2', date: '2019-04-02' }
      ]
    }
  }),
  components: {
    'full-calendar': FullCalendar,
    'navigation-menu': NavigationMenu
  },
  methods: {
    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr)
    }
  }

}
</script>
<style lang='scss'>
  .fc-toolbar {
    display: none !important;
  }
</style>
