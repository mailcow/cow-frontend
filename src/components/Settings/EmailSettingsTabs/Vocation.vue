<template>
  <div class="container is-fluid settings-view">
    <section>
      <b-field 
        class="mt-4 mb-4"
      >
        <b-switch 
          @input="change_options"
          v-model="options.enabled"
        >
          Enable vacation auto reply
      </b-switch>
      </b-field>
    </section>
    <div v-if="options.enabled">
      <section 
        class="mt-3"
      >
        <b-field
          label="Subject"
          message="Please enter a subject"
        >
          <b-input
            @input="change_options"
            v-model="options.subject"
          >
          </b-input>
        </b-field>
        <b-field 
          label="Choose accounts"
          class="mt-4 mb-4"
        >
          <b-taginput
            @input="change_options"
            v-model="options.accounts"
            :allow-new="false"
            :open-on-focus="true"
            :data="accounts"
            field="email"
            icon="email"
            placeholder="Add accounts"
            autocomplete
            >
          </b-taginput>
        </b-field>
        <b-field label="Days beetwen responses">
          <b-select 
            @input="change_options"
            v-model="options.days_beetwen_response"
            placeholder="Select a day"
          >
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
            @input="change_options"
            v-model="options.message"
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
              @input="change_options"
              v-model="options.dont_send_respnse"
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
                @input="change_options"
                v-model="options.enable_auto_repley"
              >
                Enable auto reply on
              </b-checkbox>
            </b-field>
            <b-field>
              <b-datetimepicker
                :disabled="!options.enable_auto_repley"
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
                @input="change_options"
                v-model="options.disable_auto_repley"
              >
                Disable auto reply on
              </b-checkbox>
            </b-field>
            <b-field >
              <b-datetimepicker
                :disabled="!options.disable_auto_repley"
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
              @input="change_options"
              v-model="options.always_vocation_message_response"
            >
              Always send vacation message response
            </b-checkbox>
          </b-field>
          <b-field
            class="mt-5"
          >
            <b-checkbox
              @input="change_options"
              v-model="options.discard_incoming_mails"
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
  }),
  computed: {
    ...mapGetters([
      'accounts'
    ]),
    options: {
      get () {
        return this.$store.getters.email_settings('email-vocation');
      },
      set () {
        this.change_options();
      }
    }
  },
  methods: {
    change_options () {
      const options = {
        'email-vocation': Object.assign({}, this.options)
      };
      this.$store.commit('add_to_unsaved_changes', {'section': 'email', 'data': options})
    }
  }
};
</script>
