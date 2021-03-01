<template>
  <div class="settings-tabs">
    <b-tabs v-model="actve_tab">
      <b-tab-item label="General">
        <cow-general></cow-general>
      </b-tab-item>
      <b-tab-item label="Filters">
        <cow-filters></cow-filters>
      </b-tab-item>
      <b-tab-item label="Vacation">
        <cow-vacation></cow-vacation>
      </b-tab-item>
      <b-tab-item label="Forward">
        <cow-forward></cow-forward>
      </b-tab-item>
    </b-tabs> 
    <b-button
      v-if="unsaved_changes"
      class="settings-save-btn"
      size="is-small"
      type="is-primary"
      icon-left="content-save"
      @click.stop="save_settings"
    >
      SAVE
    </b-button>
  </div>
</template>
<script>

import SettingsService from 'mailcow-services/SettingsService';
import Filters from 'mailcow-components/Settings/EmailSettingsTabs/Filters';
import Forward from 'mailcow-components/Settings/EmailSettingsTabs/Forward';
import General from 'mailcow-components/Settings/EmailSettingsTabs/General';
import Vacation from 'mailcow-components/Settings/EmailSettingsTabs/Vacation';

import { mapGetters } from 'vuex';

export default {
  data: () => ({
    actve_tab: 0
  }),
  computed: {
    ...mapGetters([
        'unsaved_changes'
      ])
  },
  methods: {
    success_message (message) {
      this.$buefy.toast.open({
          message: message,
          type: 'is-success'
      });
    },
    error_message (message) {
      this.$buefy.snackbar.open({
          duration: 3000,
          message: message,
          type: 'is-danger',
          position: 'is-top',
          actionText: 'CLOSE',
          queue: true
      });
    },
    save_settings () {
      this.$store.commit('set_settings_loading_status', true);
      let data = {};
      let settings = Object.assign({}, this.unsaved_changes);
      data.content = settings['email'];
      data.accounts = [];
      data.section = 'email';

      SettingsService.update_settings(data)
        .then(() => {
          this.$store.dispatch('init_settings');
          this.$store.commit('clear_unsaved_changes');
          this.success_message("Your settings have been saved successfully 😊");
        }).catch(() => {
          this.error_message("Something went be wrong, please try later. 😓");
        });
    }
  },
  components: {
    'cow-filters': Filters,
    'cow-forward': Forward,
    'cow-general': General,
    'cow-vacation': Vacation
  }
};
</script>
