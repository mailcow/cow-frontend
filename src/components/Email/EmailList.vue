<template>
  <section class="email-list full-height">
    <div class="email-messages-action">
      <b-checkbox  style="margin: 15px 22px">Select All</b-checkbox>
      <small style="padding: 13px" class="is-pulled-right">
        <b-icon icon="chevron-left" size="is-small" ></b-icon>
        1-20 of 16
        <b-icon size="is-small" icon="chevron-right" ></b-icon>
      </small>
    </div>
    <div class="email-messages" v-for="(message, i) in $store.getters.get_messages" :key="`message-item-${i}`"> 
      <message-item v-if="message.object === 'message'" :message="message"></message-item>
      <draft-item v-else></draft-item>
    </div>
  </section>
</template>
<script>

import EmailMessageItem from 'mailcow-components/Email/EmailMessageItem';
import DraftMessageItem from 'mailcow-components/Email/DraftMessageItem';

export default {
  data: () => ({
  }),
  created () {
  },
  methods: {
  },
  watch: {
  },
  components: {
    'message-item': EmailMessageItem,
    'draft-item': DraftMessageItem
  }
};
</script>
