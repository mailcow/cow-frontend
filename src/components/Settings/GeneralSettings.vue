<template>
  <div class="container is-max-desktop settings-view">
    <h1
      class="is-size-3 has-text-bold-medium mb-4 mt-4"
    >
      Lang
    </h1>
    <section>
      <b-field>
          <b-select>
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
          <b-select>
              <option
                  :key="timezone.code"
                  v-for="timezone in timezones"
                  :value="timezone.code"
                >
                <div>
                  {{ timezone.title }}
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

export default {
  data: () => ({
    langs: [
      {title: 'Türkçe', code: 90},
      {title: 'Deutch', code: 49},
      {title: 'English', code: 44},
    ],
    timezones: [
      {title: 'Europe/Istanbul', code: 90}
    ]    
  }),
  components: {
    'reset-user-password': ResetUserPassword
  }
};
</script>
