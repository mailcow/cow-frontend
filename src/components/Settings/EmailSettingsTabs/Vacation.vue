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
        <form ref="form">
          <b-field
            label="Subject"
            message="Please enter a subject"
          >
            <b-input
              placeholder="Auto reply subject"
              @input="change_options"
              v-model="options.subject"
            >
            </b-input>
          </b-field>
          <b-field
            :type="{ 'is-danger': !options.accounts || (options.accounts && !options.accounts.length)}"
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
          <b-field label="Days beetwen responses" :type="{ 'is-danger': !options.days_beetwen_response }">
            <b-select 
              required
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
            :type="{ 'is-danger': !options.message }"
            label="Message"
          >
            <b-input
              required
              @input="change_options"
              v-model="options.message"
              rows="1"
              placeholder="Your message"
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
                v-model="options.ignore_lists"
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
                  v-model="options.enable_auto_reply"
                >
                  Enable auto reply on
                </b-checkbox>
              </b-field>
              <b-field>
                <b-datepicker
                  @input="set_date_time('enable', $event)"
                  :value="get_date(options.enable_reply_on)"
                  :required="options.enable_auto_reply"
                  :disabled="!options.enable_auto_reply"
                  placeholder="Type or select a date..."
                  icon="calendar-today"
                  editable>
                </b-datepicker>
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
                  v-model="options.disable_auto_reply"
                >
                  Disable auto reply on {{options.disable_auto_reply}}
                </b-checkbox>
              </b-field>
              <b-field >
                <b-datepicker
                  @input="set_date_time('disable', $event)"
                  :value="get_date(options.disable_reply_on)"
                  :required="options.disable_auto_reply"
                  :disabled="!options.disable_auto_reply"
                  placeholder="Type or select a date..."
                  icon="calendar-today"
                  editable>
                </b-datepicker>
              </b-field>
            </b-field>
            <b-field
              class="mt-5"
            >
              <b-checkbox
                @input="change_options"
                v-model="options.always_vacation_message_response"
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
        </form>
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
        return this.$store.getters.email_settings('email-vacation');
      },
      set () {
        this.change_options();
      }
    }
  },
  methods: {
    get_date (date) {
      if (typeof date === 'string') {
        return new Date(date);
      }
      return date;
    },
    set_date_time (type, date) {
      if (type === 'disable') {
        this.options.disable_reply_on = date.toString();
      } else {
        this.options.enable_reply_on = date.toString();
      }
      this.change_options();
    },
    change_options () {

      if (!this.$refs.form) {
        return false;
      }

      let form_is_valid = this.$refs.form.checkValidity();

      if (this.options.disable_auto_reply && this.options.disable_reply_on === undefined) {
        return false;
      }

      if (this.options.enable_auto_reply && this.options.enable_reply_on === undefined) {
        return false;
      }

      if (this.options.accounts.length && form_is_valid) {
        const options = {
          'email-vacation': Object.assign({}, this.options)
        };
        this.$store.commit('add_to_unsaved_changes', {'section': 'email', 'data': options});
      } else {
        this.$store.commit('remove_to_unsaved_changes', {section: 'email', setting_name: 'email-vacation'});
      }
    }
  }
};
</script>
