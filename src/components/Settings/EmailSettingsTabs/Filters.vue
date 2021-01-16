<template>
  <div>
    <b-button style="float: right" type="is-primary">Create Filter</b-button>
    <div class="is-justify-content-center is-align-items-center ">
      <empty-state mode="page" text="Not yet create any filters"></empty-state>
    </div>
  </div>
</template>
<script>

import EmptyState from 'mailcow-components/EmptyState/State';

export default {
  name: 'Filters',
  data: () => ({
    filters: []
  }),
  created () {
  },
  components: {
    'empty-state': EmptyState
  }
};
</script>
