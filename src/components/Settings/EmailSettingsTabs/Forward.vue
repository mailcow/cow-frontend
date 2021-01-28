<template>
  <div class="container is-fluid settings-view">
    >> {{$store.getters.unsaved_changes}}
    <section>
      <b-field>
        <b-switch v-model="options.status">Forward incoming messages {{options.status ? 'Open' : 'Closed'}}</b-switch>
      </b-field>
      <div v-if="options.status">
        <b-field label="Add a email address">
          <b-taginput
            v-model="options.emails"
            icon="email"
            :placeholder="options.emails ? 'Add another email' : 'Enter an email'"
            >
          </b-taginput>
        </b-field>
        <b-field>
          <b-checkbox class="mt-1" v-model="options.kepp_copy">Kepp a copy</b-checkbox>
        </b-field>
      </div>
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
  