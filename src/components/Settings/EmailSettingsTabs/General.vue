<template>
  <div class="container is-max-desktop settings-view">
    <section>
      <b-field
        class="mt-4 mb-4"
      >
        <b-switch v-model="options.notifications">Browser notifications {{options.notifications ? 'Open' : 'Closed'}}</b-switch>
      </b-field>
      <b-field
        class="mt-4 mb-4"
        label="Auto refresh every"
      >
        <b-select v-model="options.refresh">
          <option value="1m">1 Minute</option>
          <option value="5m">5 Minute</option>
          <option value="10m">10 Minute</option>
          <option value="30m">30 Minute</option>
          <option value="1h">1 Hour</option>
        </b-select>
      </b-field>
    </section>
  </div>
</template>
<script>
export default {
  data: () => ({
    options: {
      notifications: true,
      refresh: '5m'
    }
  })
};
</script>
