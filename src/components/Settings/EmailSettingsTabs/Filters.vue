<template>
  <div class="container is-max-desktop settings-view">
    <b-button @click="open_filter_dialog" style="float: right" type="is-primary">Create Filter</b-button>
    <new-filter-dialog></new-filter-dialog>
    <div class="is-justify-content-center is-align-items-center ">
      <empty-state mode="page" text="Not yet create any filters"></empty-state>
    </div>
  </div>
</template>
<script>

import EmptyState from 'mailcow-components/EmptyState/State';
import NewFilterDialog from 'mailcow-components/Settings/EmailSettingsTabs/NewFilterDialog';

export default {
  name: 'Filters',
  data: () => ({
    filters: []
  }),
  created () {
  },
  methods: {
    open_filter_dialog () {
      this.$store.commit('set_filter_dialog', true);
    }
  },
  components: {
    'empty-state': EmptyState,
    'new-filter-dialog': NewFilterDialog
  }
};
</script>
