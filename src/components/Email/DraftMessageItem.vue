<template>
  <article
    @click.stop="open_draft"
    class="media email-message"
  >
  <div class="media-left email-avatar">
    <text-avatar v-once :name="user_text" :id="message.id"></text-avatar>
  </div>
  <div class="media-content">
    <div class="content">
    <strong>{{user_text}}</strong>
    <small class="pl-2">{{message.from[0].email}}</small>
    <p>
      <strong class="is-size-7">{{message.subject || '-'}}</strong>
      <br>
      <span>{{message.snippet || '-'}}</span>
    </p>
    </div>
  </div>
  <div class="media-right">
    <div>
    <small class="is-pulled-right">{{message.date | from_now}}</small>
    </div>
    <div v-if="message.files.length > 0">
    <small class="is-pulled-right">
      <b-icon  icon="attachment" ></b-icon>
    </small>
    </div>
    <div >
    <small class="is-pulled-right"> 
      <b-icon icon="email-open mt-4"></b-icon>
    </small>
    </div>
  </div>
  </article>
</template>
<script>

import TextAvatar from 'mailcow-components/TextAvatar';

export default {
  data: () => ({
  }),
  created () {
  },
  methods: {
    open_draft () {
      let msg = Object.assign({}, this.message);
      this.$store.commit('set_choose_email', msg);
      setTimeout( () => {this.$store.commit('change_mail_dialog', true)}, 400);
    }
  },
  computed: {
    user_text () {
      var _user = this.message.from[0];
      return _user.name || _user.email;
    }
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    'text-avatar': TextAvatar
  }
};
</script>
<style>
  .media-content {
    text-overflow: ellipsis !important;
    overflow: hidden;
    white-space: nowrap;
  }
</style>