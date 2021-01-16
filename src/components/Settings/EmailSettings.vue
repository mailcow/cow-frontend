<template>
  <b-tabs v-model="actve_tab">
    <b-tab-item label="General">
      <cow-general></cow-general>
    </b-tab-item>
    <b-tab-item label="Filters">
      <cow-filters></cow-filters>
    </b-tab-item>
    <b-tab-item label="Vocation">
      <cow-vocation></cow-vocation>
    </b-tab-item>
    <b-tab-item label="Forward">
      <cow-forward></cow-forward>
    </b-tab-item>
  </b-tabs>
</template>
<script>

import Filters from 'mailcow-components/Settings/EmailSettingsTabs/Filters';
import Forward from 'mailcow-components/Settings/EmailSettingsTabs/Forward';
import General from 'mailcow-components/Settings/EmailSettingsTabs/General';
import Vocation from 'mailcow-components/Settings/EmailSettingsTabs/Vocation';

export default {
  data: () => ({
    actve_tab: 0
  }),
  components: {
    'cow-filters': Filters,
    'cow-forward': Forward,
    'cow-general': General,
    'cow-vocation': Vocation
  }
};
</script>
