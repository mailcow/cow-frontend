<template>
  <div class="modal-card" style="width: 400px; max-width: 400px">
    <header class="modal-card-head">
      {{$t('AccountsDialog.title')}}
    </header>
    <section class="modal-card-body" >
      <b-button
        @click="choose('gmail')"
        expanded 
        class="mt-2 account-type-button google" 
        size="is-medium"
        icon-left="gmail"
        :disabled="is_loading"
      >
        {{$t('AccountsDialog.gmail')}}
      </b-button>
      <b-button
        @click="choose('microsoft')"
        expanded 
        class="mt-2 account-type-button microsoft"
        size="is-medium"
        icon-left="microsoft-windows"
        :disabled="is_loading"
      >
        {{$t('AccountsDialog.outlook')}}
      </b-button>
      <b-button
        @click="choose('generic')"
        expanded 
        class="mt-2 account-type-button imap" 
        size="is-medium"
        icon-left="email"
        :disabled="is_loading"
      >
        {{$t('AccountsDialog.imap_smtp')}}
      </b-button>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">Close</button>
    </footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    is_loading: false
  }),
  methods: {
    choose (app_name) {
      this.is_loading = true;
      if (app_name === 'generic') {
        this.$emit('choose', app_name);
      } else {
        this.$buefy.toast.open({
            message: this.$t('AccountsDialog.messages.coming_soon'),
            type: 'is-primary',
            position: 'is-top',
            queue: false
        });
      }
      this.is_loading = false;
    }
  }
};
</script>
<style lang="scss">
.account-type-button {
  justify-content: start;

  &.microsoft {
    color : #006EC0;
  }

  &.google {
    color: #B7241E;
  }

  &.imap {
    color: #000;
  }
}
</style>
