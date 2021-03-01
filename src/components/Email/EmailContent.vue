<template>
  <component v-if="selected_email" :is="is_mobile ? 'b-modal' : 'div'" v-model="dialog" has-modal-card full-screen class="mail-content-dialog" :class="{'mail-content-container': !is_mobile}">
    <div class="email-content">
      <div class="email-content-nav">
        <strong class="email-subject">{{message.subject}}</strong>
        <div class="email-actions">
          <b-icon class="ml-5 c-pointer" @click.native="open_email_dialog('reply')" icon="reply"></b-icon>
          <b-icon class="ml-5 c-pointer" @click.native="open_email_dialog('forward')" icon="forward"></b-icon>
          <b-icon class="ml-5 is-hidden-touch c-pointer" @click.native="move_message('trash')" icon="delete"></b-icon>
          <b-icon class="ml-5 is-hidden-touch c-pointer" @click.native="move_message('spam')" icon="alert-circle"></b-icon>
          <b-icon @click.native="star_message" class="ml-5 is-hidden-touch c-pointer" :type="message.starred ? 'is-warning': ''" :icon="message.starred ? 'star' : 'star-outline'"></b-icon>
          <message-menu :message="message" class="ml-5"></message-menu>
          <b-icon
              v-if="is_mobile"
              icon="close"
              class="ml-5"
              @click.native="close_mail_dialog"
            >
          </b-icon>
        </div>
      </div>
      <article class="media email-content-header">
        <figure class="media-left">
          <text-avatar :name="user_text"></text-avatar>
        </figure>
        <div class="media-content" style="overflow: inherit;">
        <b-dropdown :triggers="['hover']" aria-role="list" class="mail-users-list">
            <template #trigger>
              <div class="content">
                <p>
                  <strong>{{user_text}}</strong><br/>
                  <small>{{message.from[0].email}}</small>
                </p>
              </div>  
            </template>
            <b-dropdown-item aria-role="listitem" class="mail-users-item">Sender: {{message.from[0].email}}</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" class="mail-users-item">Receivers: {{message.to.map(t => t.email).join(',')}}</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" class="mail-users-item">CC: {{message.cc.map(t => t.email).join(',')}}</b-dropdown-item>
        </b-dropdown>
        </div>
        <div class="media-right has-text-right">
          <span>{{message.date | get_date}}</span>
          <br>
          <span>{{message.date | get_time }} ({{message.date | from_now }})</span>
        </div>
      </article>
      <div class="email-content-text">
        <div v-html="message.body">
        </div>
      </div>
      <div class="email-content-text">
        <h1  v-show="message.files && message.files.length" class="has-text-weight-bold">Attachments</h1>
        <hr v-show="message.files && message.files.length" >
        <b-field grouped group-multiline>
          <div class="control">
            <b-taglist attached :key="attach.id" v-for="attach in message.files">
              <b-tag type="is-info">{{attach.filename || 'Unnamed'}}</b-tag>
              <b-tag type="is-info">({{attach.size | get_size}})</b-tag>
              <b-tag type="is-danger">
                <b-icon
                  class="c-pointer"
                  @click.native="download_attachment(attach)"
                  icon="download"
                  size="is-small"
                >
                </b-icon>
              </b-tag>
            </b-taglist>
          </div>
        </b-field>
      </div>
    </div>
  </component>
  <div v-else class="is-justify-content-center is-align-items-center mail-content-container is-hidden-touch">
    <empty-state mode="envelope" :text="$t('Email.EmailContent.no_selected')"></empty-state>
  </div>
</template>
<script>

import EmptyState from 'mailcow-components/EmptyState/State';
import MessageMenu from 'mailcow-components/Email/MessageMenu';
import TextAvatar from 'mailcow-components/TextAvatar';
import AttachmentsMix from 'mailcow-mixins/Attachments';

export default {
  data: () => ({
    message: {},
    dialog: true,
    selected_email: null,
    window: {
      width: 0,
      height: 0
    }
  }),
  mixins: [AttachmentsMix],
  computed: {
    is_mobile () {
      return this.window.width < 770;
    },
    user_text () {
      var _user = this.message.from[0];
      if (this.$route.params.folder === 'sent') {
        _user = this.message.to[0];
      }
      return _user.name || _user.email;
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;      
    },
    open_email_dialog (type) {
      let message = Object.assign({}, this.message);

      if (type === 'reply') {
        const to = message.from;
        message.subject = message.subject.substr(0,3) !== 'RE:' ? ("RE: " + message.subject) : message.subject;
        message.from = message.to;
        message.to = to;
        message.body = `<br/><br/><div><span>${this.message.from[0].email} wrote it.</span><hr></div>` + message.body;
      } else if (type === 'forward') {
        message.to = [];
      }

      this.$store.commit('set_choose_email', message);
      this.$store.commit('change_mail_dialog', true);
    },
    close_mail_dialog () {
      this.dialog = false;
      this.selected_email = null;
      this.message = {}; 
    },
    get_message () {
      this.message = this.$store.getters.get_message(this.$route.params.message_id);
      this.dialog = true;
      this.selected_email = true;
      var elmnt = document.getElementsByClassName("mail-content-container");
      if (elmnt) {
        elmnt[0].scrollTop = 0;
      }
    },
    move_message (dest) {
      var folder = this.$store.getters.get_folder(dest);
      const msg = {'folder_id': folder.id};
      this.$store.dispatch('update_message', {'mail_id': this.message.id, 'message': msg});
      this.$router.replace({'name': 'EmailFolder', 'params': {}});
    },
    star_message () {
      const msg = {'starred': !this.message.starred};
      this.message.starred = !this.message.starred;
      this.$store.dispatch('update_message', {'mail_id': this.message.id, 'message': msg, 'no_update': true});
    }
  },
  components: {
    'empty-state': EmptyState,
    'message-menu': MessageMenu,
    'text-avatar': TextAvatar
  },
  watch: {
    $route (to) {
      if (to.params.message_id) {
        this.get_message()
      } else {
        this.close_mail_dialog();
      }
    }
  }
};
</script>
<style lang="scss">
</style>
