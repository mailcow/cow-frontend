<template>
  <article
    @click="select_message"
    class="media email-message" 
    :class="{'email-unread': message.unread, 'email-selected': $route.params.message_id === message.id}"
  >
    <div class="media-left email-avatar">
      <text-avatar v-once :name="message.from[0].name" :id="message.id"></text-avatar>
    </div>
    <div class="media-content">
      <div class="content">
        <strong>{{message.from[0].name}}</strong>
        <small class="pl-2">{{message.from[0].email}}</small>
        <p>
          <strong class="is-size-7">{{message.subject}}</strong>
          <br>
          <span>{{message.snippet}}</span>
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
          <b-icon v-if="message.starred" type="is-warning" icon="star-outline"></b-icon>
          <b-icon v-else icon="star-outline"></b-icon>
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
    select_message () {
      if (this.$route.params.message_id !== this.message.id) {
        this.$router.push({params:{'message_id': this.message.id}});
      }
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