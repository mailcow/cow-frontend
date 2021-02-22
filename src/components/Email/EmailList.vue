<template>
  <section class="email-list full-height">
    <div class="email-messages-action">
      <b-checkbox :value="$store.getters.get_slected_messages_count !== 0" @input="$store.commit($event ? 'select_all_message' : 'clear_selected_message')">
        <span v-if="$store.getters.get_slected_messages_count === 0">Select All</span>
        <span v-else class="title is-size-6">Selected {{$store.getters.get_slected_messages_count}}</span>
      </b-checkbox>
      <div class="block" v-if="$store.getters.get_slected_messages_count === 0">
        <b-icon icon="refresh c-pointer" @click.native="$store.dispatch('get_messages')"></b-icon>
        <b-icon icon="chevron-left c-pointer" @click.native="chnage_page(-1)"></b-icon>
        {{$store.getters.get_filters.offset + 1}}-{{$store.getters.get_filters.offset + $store.getters.get_messages_count}} of {{$store.getters.get_total_message_count}}
        <b-icon icon="chevron-right c-pointer" @click.native="chnage_page(1)"></b-icon>
      </div>
      <div v-else class="block">
        <span class="selected-title title is-size-6 mr-3"></span>
        <b-icon v-if="$route.params.folder !== 'drafts'" @click.native="move_message('trash')" class="mr-2 c-pointer" icon="delete" ></b-icon>
        <b-icon v-else @click.native="delete_draft()" class="mr-2 c-pointer" icon="delete" ></b-icon>
        <b-icon v-if="$route.params.folder !== 'drafts'" @click.native="move_message('spam')" class="mr-2 c-pointer" icon="alert-circle" ></b-icon>
        <message-menu v-if="$route.params.folder !== 'drafts'" ></message-menu>
      </div>
    </div>
    <div v-if="$store.getters.email_is_loading" class="email-messages">
      <message-sekeleton mode="email-list" v-for="i in Math.floor(Math.random() * 10) + 5" :key="`message-item-loading-${i}`"></message-sekeleton>
    </div>
    <div v-else class="email-messages" v-for="(message, i) in $store.getters.get_messages" :key="`message-item-${i}`"> 
      <message-item v-if="message.object === 'message'" :message="message"></message-item>
      <draft-item v-else :message="message"></draft-item>
    </div>
    <div v-if="!$store.getters.email_is_loading && $store.getters.get_messages_count === 0">
      <h3  style="text-align: center; margin-top: 1em; text-transform: uppercase; color: #b9b8b8" class="subtitle is-4">{{$route.query.f || $route.params.folder}} BOX EMPTY</h3>
    </div>
  </section>
</template>
<script>

import EmailMessageItem from 'mailcow-components/Email/EmailMessageItem';
import DraftMessageItem from 'mailcow-components/Email/DraftMessageItem';
import MessageMenu from 'mailcow-components/Email/MessageMenu';
import Skeleton from 'mailcow-components/Email/Skeleton';

export default {
  data: () => ({
    is_loading: true
  }),
  created () {
  },
  methods: {
    move_message (dest) {
      var folder = this.$store.getters.get_folder(dest);
      const msg = {'folder_id': folder.id};
      this.$store.dispatch('update_messages', msg);
      this.$router.replace({'name': 'EmailFolder', 'params': {}});
    },
    delete_draft () {
      this.$store.dispatch('delete_drafts');
      this.$store.commit('change_mail_dialog', false);
    },
    chnage_page (status) {
      if (this.$store.getters.get_filters.offset + status > 0 && 
        (this.$store.getters.get_filters.offset + this.$store.getters.get_messages_count + status) < this.$store.getters.get_total_message_count) {
        this.$store.dispatch('change_page', status);
      }
    }
  },
  watch: {
  },
  components: {
    'message-item': EmailMessageItem,
    'draft-item': DraftMessageItem,
    'message-sekeleton': Skeleton,
    'message-menu': MessageMenu
  }
};
</script>
