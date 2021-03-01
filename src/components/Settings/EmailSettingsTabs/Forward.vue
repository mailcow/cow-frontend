<template>
  <div class="container is-fluid settings-view">
    <section>
      <b-field>
        <b-switch @input="change_options" v-model="options.enabled">Forward incoming messages</b-switch>
      </b-field>
      <div v-if="options.enabled">
        <b-field label="Add a email address">
          <b-taginput
            @input="change_options"
            v-model="options.emails"
            icon="email"
            :placeholder="options.emails ? 'Add another email' : 'Enter an email'"
            >
          </b-taginput>
        </b-field>
        <b-field>
          <b-checkbox @input="change_options" class="mt-1" v-model="options.keep_a_copy">Keep a copy</b-checkbox>
        </b-field>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data: () => ({
  }),
  computed: {
    options: {
      get () {
        return this.$store.getters.email_settings('email-forward');
      },
      set () {
        this.change_options();
      }
    }
  },
  methods: {
    change_options () {
      if (this.options.emails.length) {
        const options = {
          'email-forward': Object.assign({}, this.options)
        };
        this.$store.commit('add_to_unsaved_changes', {'section': 'email', 'data': options});
      } else {
        this.$store.commit('remove_to_unsaved_changes', {section: 'email', setting_name: 'email-forward'});
      }
    }
  }
};
</script>
  
