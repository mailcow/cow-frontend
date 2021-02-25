<template>
  <div class="container is-fluid settings-view">
    <h1
      class="is-size-3 has-text-bold-medium mb-4 mt-4"
    >
      Lang
    </h1>
    <section>
      <b-field>
        <b-select
          v-model="options.lang"
          @input="change_options"
          >
          <option
            :key="lang.code"
            v-for="lang in langs"
            :value="lang.code"
            >
            <div>
              {{ lang.title }}
            </div>
          </option>
        </b-select>
      </b-field>
    </section>
    <hr>
    <h1
      class="is-size-3 has-text-bold-medium mb-4 mt-4"
      >
      Timezone / Date
    </h1>
    <section>
      <b-field>
        <b-select
          v-model="options.timezone"
          @input="change_options"
          >
          <option
            :key="timezone"
            v-for="timezone in timezones"
            :value="timezone"
            >
            <div>
              {{ timezone }}
            </div>
          </option>
        </b-select>
      </b-field>
    </section>
    <hr>
    <reset-user-password
      inline
      >
    </reset-user-password>
  </div>
</template>
<script>

import ResetUserPassword from 'mailcow-components/Settings/ResetUserPassword';
import {timezones, langs} from 'mailcow-utils';

export default {
  data: () => ({
    langs: langs,
    timezones: timezones
  }),
  computed: {
    options: {
      get () {
        return this.$store.getters.general_settings;
      }
    }
  },
  methods: {
    change_options () {
      const options = Object.assign({}, this.options);
      this.$i18n.locale = options.lang;
      this.$store.commit('set_local_settings', {'section': 'general', 'options': options});    
    }
  },
  components: {
    'reset-user-password': ResetUserPassword
  }
};
</script>
