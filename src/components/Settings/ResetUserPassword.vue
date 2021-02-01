<template>
  <section>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <h1
        class="is-size-3 has-text-bold-medium mb-4"
      >
        Reset Password
      </h1>
      <ValidationProvider
        rules="required"
        vid="old_password"
        name="Password"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="Curret Password"
        >
          <b-input
            required
            password-reveal
            type="password"
            placeholder="Old Password"
            autocomplete="off"
            v-model="credentials.old_password"
          >
          </b-input>
        </b-field>
      </ValidationProvider>
      <ValidationProvider
        rules="required"
        vid="password"
        name="Password"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="New Password"
        >
            <b-input
              required
              password-reveal
              v-model="credentials.new_password"
              autocomplete="off"
              type="password"
              placeholder="New Password"
            >
            </b-input>
        </b-field>
      </ValidationProvider>
      <ValidationProvider
        rules="required|confirmed:password"
        name="Password Confirmation"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="Again New Password"
         >
          <b-input
            required
            password-reveal
            v-model="credentials.re_new_password"
            autocomplete="off"
            type="password"
            placeholder="Again Password"
          >
          </b-input>
        </b-field>
      </ValidationProvider>
      <b-field
        class="mt-4"
      >
        <p
          class="control"
        >
          <b-button
            @click="handleSubmit(change_password)"
            :loading="is_loading"
            label="Change Password"
            type="is-primary" 
          />
        </p>
      </b-field>
    </ValidationObserver>
  </section>
</template>

<script>

import { ValidationObserver, ValidationProvider } from "vee-validate";
import SettingsService from 'mailcow-services/SettingsService';

export default {
  data: () => ({
    is_loading: false,
    credentials: {}
  }),
  methods: {
    reset_form () {
      this.credentials = {};
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },
    change_password () {
      this.is_loading = true;
      SettingsService.reset_password(this.credentials)
        .then(() => {
          this.$buefy.toast.open({ message: 'Your password changed 🎉', type: 'is-success', position: 'is-top'});
          this.is_loading = false;
          this.reset_form();
        }).catch((err) => {
          let err_code = err.response.data.code;
          this.$buefy.toast.open({ message: `Sorry, something went be wrong, please try later ${err_code} 😢`, type: 'is-danger', position: 'is-top'});
          this.is_loading = false;
        });
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    }
  }
};
</script>
