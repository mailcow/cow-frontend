<template>
  <div class="container is-max-desktop">
    <section>
      <b-field 
        class="mt-4 mb-4"
      >
        <b-switch 
          v-model="vocation_options.vocation_mode"
        >
          Enable vacation auto reply
      </b-switch>
      </b-field>
    </section>
    <div v-if="vocation_options.vocation_mode">
      <section 
        class="mt-3"
      >
        <b-field
          label="Subject"
          message="Please enter a subject"
        >
          <b-input
            v-model="vocation_options.subject"
          >
          </b-input>
        </b-field>
        <b-field 
          label="Choose accounts"
          class="mt-4 mb-4"
        >
          <b-taginput
            v-model="vocation_options.accounts"
            :allow-new="false"
            :open-on-focus="true"
            :data="accounts"
            field="email"
            icon="email"
            placeholder="Add accounts"
            autocomplete
            @typing="get_filterd"
            >
          </b-taginput>
        </b-field>
        <b-field label="Days beetwen responses">
          <b-select v-model="vocation_options.days" placeholder="Select a day">
            <option 
              :key="`day-${i}`"
              v-for="i in 7"
              :value="i"
            >
              {{i}}
            </option>
          </b-select>
        </b-field>
        <b-field 
          label="Message"
        >
          <b-input
            v-model="vocation_options.message"
            rows="1"
            type="textarea"
          >
          </b-input>
        </b-field>
        <div
          class="mt-6"
        >
          <b-field>
            <b-checkbox
              v-model="vocation_options.dont_send"
            >
              Do not send responses to mailing lists
            </b-checkbox>
          </b-field>
          <b-field 
            grouped
          >
            <b-field
              style="display: flex;"
            >
              <b-checkbox
                v-model="vocation_options.enable_auto_repley"
              >
                Enable auto reply on
              </b-checkbox>
            </b-field>
            <b-field>
              <b-datetimepicker
                :disabled="!vocation_options.enable_auto_repley"
                placeholder="Type or select a date..."
                icon="calendar-today"
                editable>
              </b-datetimepicker>
            </b-field>
          </b-field>
          <b-field 
            grouped
          >
            <b-field
              style="display: flex;"
            >
              <b-checkbox
                v-model="vocation_options.disable_auto_repley"
              >
                Disable auto reply on
              </b-checkbox>
            </b-field>
            <b-field >
              <b-datetimepicker
                :disabled="!vocation_options.disable_auto_repley"
                placeholder="Type or select a date..."
                icon="calendar-today"
                editable>
              </b-datetimepicker>
            </b-field>
          </b-field>
          <b-field
            class="mt-5"
          >
            <b-checkbox
              v-model="vocation_options.always_send"
            >
              Always send vacation message response
            </b-checkbox>
          </b-field>
          <b-field
            class="mt-5"
          >
            <b-checkbox
              v-model="vocation_options.discard_incoming"
            >
              Discard incoming mails during vacation
            </b-checkbox>
          </b-field>
        </div>
      </section>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
  data: () => ({
    tags: [],
    filterd_tags: [],
    vocation_options: {}
  }),
  computed: {
    ...mapGetters([
      'accounts'
    ])
  },
  methods: {
    get_filterd () {

    }
  }
};
</script>
