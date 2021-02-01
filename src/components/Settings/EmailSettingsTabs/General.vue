<template>
  <div class="container is-fluid settings-view">
    <section>
      <b-field
        class="mt-4 mb-4"
      >
        <b-switch
          @input="change_options"
          v-model="options.browser_notification"
        >
          Browser notifications
        </b-switch>
      </b-field>
      <b-field
        class="mt-4 mb-4"
        label="Auto refresh every"
      >
        <b-select
          @input="change_options"
          v-model="options.auto_refresh_every"
        >
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
  }),
  created () {
  },
  computed: {
    options: {
      get () {
        return this.$store.getters.email_settings('email-general');
      },
      set () {
        this.change_options();
      }
    }
  },
  methods: {
    change_options () {
      const options = {
        'email-general': Object.assign({}, this.options)
      };
      this.$store.commit('add_to_unsaved_changes', {'section': 'email', 'data': options});
    }
  }
};
</script>
