<template>
  <transition 
    name="mail-compose-transition"
  >
    <div
      key="mail-compose"
      v-if="mail_dialog"
      class="mail-compose" 
      :class="{'mini': mode === 'mini', 'full': mode === 'full'}"
      :style="{'height': dialog_height + 'em'}"
    >
      <sending-animation
        :loading="sending_animation"
      >
      </sending-animation>
      <b-loading
        :is-full-page="false"
        v-model="is_loading"
        :can-cancel="false"
      >
      </b-loading>
      <div
        class="mail-compose-nav"
      >
        <span
          class="is-size-6"
        >
          {{$t('Email.NewEmailDialog.title')}}
        </span>
        <div>
          <b-icon
            :icon="mode_icon[0]"
            size="is-small"
            class="px-4 actions"
            @click.native="mode = (mode === 'mini' ? 'normal' : 'mini')"
          >
          </b-icon>
          <b-icon
            :icon="mode_icon[1]"
            size="is-small"
            class="px-4 actions"
            @click.native="mode = (mode === 'normal' ? 'full' : 'normal')"
          >
          </b-icon>
          <b-icon
            icon="content-save"
            size="is-small"
            class="px-4 actions"
            @click.native="init_send_data(true)"
          >
          </b-icon>
          <b-icon
            size="is-small"
            icon="close"
            class="px-4 actions"
            @click.native="$store.commit('change_mail_dialog', false);"
          >
          </b-icon>
        </div>
      </div>
      <div
        class="mail-compose-header"
      >
        <b-field>
            <b-taginput
                :placeholder="$t('Email.NewEmailDialog.to')"
                class="w-100"
                field="email"
                :before-adding="check_email_address"
                :create-tag="(ev) => { return {'email': ev, 'name': ev}}"
                v-model="email_data.to"
                @typing="get_filtered_users"
            >
            </b-taginput>
            <p class="control">
              <button
                @click="show_cc = !show_cc" class="button"
              >
                <span>{{$t('Email.NewEmailDialog.cc')}}</span>
              </button>
            </p>
            <p class="control">
              <button
                @click="show_bcc = !show_bcc" class="button"
              >
                <span>{{$t('Email.NewEmailDialog.bcc')}}</span>
              </button>
            </p>
        </b-field>
        <transition
          name="fade"
        >
          <b-field>
            <b-taginput
                v-show="show_cc"
                :placeholder="$t('Email.NewEmailDialog.cc')"
                class="w-100"
                field="email"
                :create-tag="(ev) => { return {'email': ev, 'name': ev}}"
                v-model="email_data.cc"
                :before-adding="check_email_address">
            </b-taginput>
          </b-field>
        </transition>
        <transition
          name="fade"
        >
          <b-field>
            <b-taginput
                v-show="show_bcc"
                :placeholder="$t('Email.NewEmailDialog.bcc')"
                class="w-100"
                field="email"
                :create-tag="(ev) => { return {'email': ev, 'name': ev}}"
                v-model="email_data.bcc"
                :before-adding="check_email_address">
            </b-taginput>
          </b-field>
        </transition>
        <b-field>
          <b-input
            v-model="email_data.subject"
            :placeholder="$t('Email.NewEmailDialog.subject')"
          >
          </b-input>
        </b-field>
      </div>
      <div
        class="mail-compose-body"
      >
        <b-field>
          <editor
            ref="editor"
            v-model="email_data.body"
          >
          </editor>
        </b-field>
      </div>
      <div
        class="mail-compose-footer"
      >
        <attachment
          @uploaded="uploaded_new_file"
          @delete="delete_attachment"
          @busy="attachments_busy = $event"
          :files="email_data.files" 
          class="mail-attachment"
        >
          <template v-slot:button="props">
            <b-icon
              @click.native="props.dialog"
              type="is-black"
              icon="paperclip"
              class="c-pointer"
            >
            </b-icon>
            <div class="badge-20" v-if="email_data.files.length">
              <span>{{email_data.files.length}}</span>
            </div>
            <span v-show="attachments_busy">{{$t('Email.NewEmailDialog.uploading')}}</span>
          </template>
        </attachment>
        <b-button
          @click="init_send_data()"
          :disabled="attachments_busy"
          size="is-small"
          type="is-primary"
          icon-right="send"
        >
          {{$t('Email.NewEmailDialog.send')}}
        </b-button>
      </div>
    </div>
  </transition>
</template>
<script>

import Editor from 'mailcow-components/Editor';
import SendingAnimation from 'mailcow-components/Email/SendingAnimation';
import Attachment from 'mailcow-components/Email/Attachment';
import EmailService from 'mailcow-services/EmailService';

export default {
  data: () => ({
    mode: 'normal',
    dialog_height: 36,
    show_cc: false,
    show_bcc: false,
    sending_animation: false,
    is_loading: false,
    attachments_busy: false,
    email_data: {
      files: [],
      to: [],
      bcc: [],
      cc: [],
      subject: '',
      body: ''
    }
  }),
  computed: {
    mail_dialog () {
      return this.$store.getters.mail_dialog;
    },
    mail_data () {
      return this.$store.getters.choose_email;
    },
    mode_icon () {
      if (this.mode === 'normal') {
        return ['window-minimize', 'fullscreen'];
      } else if (this.mode === 'mini') {
        return ['oversan', 'fullscreen'];
      } else {
        return ['window-minimize', 'fullscreen-exit'];
      }
    }

  },
  components: {
    'editor': Editor,
    'sending-animation': SendingAnimation,
    'attachment': Attachment
  },
  methods: {
    init_send_data (is_draft = false) {
      var email_data = Object.assign({}, this.email_data);

      // Add draft attach files to sending data
      if (email_data.files) {
        email_data.file_ids = email_data.files.map((item) => item.id);
      }

      if (is_draft) {
        this.save_draft(email_data)
      } else if (email_data.to) {
        this.send(email_data);
      } else {
        this.error_message(this.$t('Email.NewEmailDialog.messages.error'));
      }
    },
    uploaded_new_file (file) {
      if (this.email_data.files) {
        this.email_data.files = this.email_data.files.concat(file);
      }
    },
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
          actionText: this.$t('Email.NewEmailDialog.messages.close'),
          queue: true
      });
    },
    clear_form () {
      this.email_data = {to: [], cc: [], bcc: [], files: []};
    },
    check_email_address (input) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(input).toLowerCase());
    },
    delete_attachment (file_index) {
      if (this.email_data.files) {
        this.email_data.files.splice(file_index, 1);
      }
    },
    get_filtered_users () {
      // TODO :: added contact search
    },
    save_draft (email_data) {
      EmailService.save_draft(email_data)
        .then(resp => {
          this.email_data = resp.data;
          this.$store.dispatch('get_messages');
          this.success_message(this.$t('Email.NewEmailDialog.messages.save_draft'));
        }).catch (() => {
          this.error_message(this.$t('Email.NewEmailDialog.messages.error'));
        });
    },
    send (email_data) {
      this.is_loading = true;
      EmailService.send_message(email_data)
        .then(() => {
          this.sending_animation = true;
          this.is_loading = false;
          setTimeout(() => {
            this.sending_animation = false
            this.$store.commit('change_mail_dialog', false);
          }, 1500);
          this.success_message(this.$t('Email.NewEmailDialog.messages.send'));
        }).catch(() => {
          this.sending_animation = false;
          this.is_loading = false;
          this.error_message(this.$t('Email.NewEmailDialog.messages.error'));
        });
    }
  },
  watch: {
    show_bcc (val) {
      this.dialog_height = val ? this.dialog_height + 3.2 : this.dialog_height - 3.2
    },
    show_cc (val) {
      this.dialog_height = val ? this.dialog_height + 3.2 : this.dialog_height - 3.2
    },
    mail_data (val) {
      if (val) {
        this.email_data = Object.assign({}, val);
        // force update tiptap editor
        if (this.$refs.editor) {
          this.$refs.editor.editor.setContent(this.email_data.body);
        }
      }
    },
    mail_dialog (val) {
      if (val) {
        if (this.mail_data) {
          this.email_data = Object.assign({}, this.mail_data);
        }
      } else {
        this.clear_form();
        this.$store.commit('set_choose_email', null);
      }
    }
  }
}
</script>
<style lang="scss">
.taginput-container {
  border-radius: 0px !important;

  &.is-focusable {
    padding-right: 2px !important;
  }
}
</style>