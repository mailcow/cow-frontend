<template>
  <section>
    <h1
      class="is-size-3 has-text-bold-medium mb-4"
    >
      Reset Password
    </h1>
    <b-field 
      label="Curret Password"
      :type="{ 'is-danger': has_error }"
      :message="{ 'Username is not available': has_error }"
    >
      <b-input
        v-model="credentials.old_password"
      >
      </b-input>
    </b-field>
    <b-field 
      label="New Password"
      :type="{ 'is-danger': has_error }"
      :message="[
        { 'Password is too short': has_error },
        { 'Password must have at least 8 characters': has_error }
      ]"
    >
        <b-input
          type="password"
        >
        </b-input>
    </b-field>
    <b-field
      label="Again New Password"
      :type="{ 'is-danger': has_error }"
      :message="[
        { 'Password is too short': has_error },
        { 'Password must have at least 8 characters': has_error }
      ]"
     >
      <b-input
        type="password"
      >
      </b-input>
    </b-field>
    <b-field>
      <p
        class="control"
      >
        <b-button
          label="Change Password"
          type="is-primary" 
        />
      </p>
    </b-field>
  </section>
</template>

<script>
export default {
  data: () => ({
    has_error: false,
    credentials: {}
  }),
  props: {
    inline: {
      type: Boolean,
      default: false
    }
  }
};
</script>
