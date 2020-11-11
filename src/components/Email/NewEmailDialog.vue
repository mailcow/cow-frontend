<template>
  <transition name="mail-compose-transition">
    <div key="mail-compose" v-if="mail_dialog" class="mail-compose" :class="{'mini': mode === 'mini', 'full': mode === 'full'}" :style="{'height': dialog_height + 'em'}">
      <sending-animation :loading="sending_animation"></sending-animation>
      <b-loading :is-full-page="false" v-model="is_loading" :can-cancel="false"></b-loading>
      <div class="mail-compose-nav">
          <span class="is-size-6">
            New E-Mail
          </span>
          <div>
            <b-icon
              :icon="mode === 'mini' ? 'overscan' : 'window-minimize'"
              size="is-small"
              class="px-4 actions"
              @click.native="mode = (mode === 'mini' ? 'normal' : 'mini')"
            >
            </b-icon>
            <b-icon
              icon="content-save"
              size="is-small"
              class="px-4 actions"
              @click.native="$store.commit('change_mail_dialog', false);"
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
      <div class="mail-compose-header">
        <b-field>
          <!-- TODO : To, CC, BCC fileds covert to comboBox -->
          <b-input v-model="email_data.to" placeholder="To" required type="email" style="width: 100%"></b-input>
          <p class="control">
            <button @click="show_cc = !show_cc" class="button">
              <span>CC</span>
            </button>
          </p>
          <p class="control">
            <button @click="show_bcc = !show_bcc" class="button">
              <span>BCC</span>
            </button>
          </p>
        </b-field>
        <transition name="fade">
          <b-field v-show="show_cc"> 
            <b-input v-model="email_data.cc" placeholder="CC"></b-input>
          </b-field>
        </transition>
        <transition name="fade">
          <b-field v-show="show_bcc">
            <b-input v-model="email_data.bcc" placeholder="BCC"></b-input>
          </b-field>
        </transition>
        <b-field>
          <b-input v-model="email_data.subject" placeholder="Subject"></b-input>
        </b-field>
      </div>
      <div class="mail-compose-body">
        <b-field>
          <editor v-model="email_data.body"></editor>
        </b-field>
      </div>
      <div class="mail-compose-footer">
        <b-icon
          type="is-black"
          icon="paperclip"
          style=" cursor: pointer;"
        >
        </b-icon>
        <b-button
          @click="init_send_data"
          size="is-small"
          type="is-primary"
          icon-right="send"
        >
          SEND
        </b-button>
      </div>
    </div>
  </transition>
</template>
<script>

import Editor from 'mailcow-components/Editor';
import SendingAnimation from 'mailcow-components/Email/SendingAnimation';
import EmailService from 'mailcow-services/EmailService';

export default {
  data: () => ({
    mode: 'normal',
    dialog_height: 36,
    show_cc: false,
    show_bcc: false,
    sending_animation: false,
    is_loading: false,
    email_data: {
      to: '',
      bcc: '',
      cc: '',
      subject: '',
      body: ''
    }
  }),
  computed: {
    mail_dialog () {
      return this.$store.getters.mail_dialog;
    }
  },
  components: {
    'editor': Editor,
    'sending-animation': SendingAnimation
  },
  methods: {
    init_send_data () {
      var email_data = Object.assign({}, this.email_data);
      // Todo :: Check all validation, This just test MVP (Minimum viable product)
      if (email_data.to) {
        email_data.to = [{'email': email_data.to, 'name': 'MAilCow'}];
        email_data.cc = [];
        email_data.bcc = [];
        this.send(email_data);
      } else {
        this.error_message('Please check form');
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
          actionText: 'CLOSE',
          queue: true
      });
    },
    clear_form () {
      this.email_data = {};
    },
    send (email_data) {
      this.is_loading = true;
      EmailService.send_message(email_data)
        .then(() => {
          this.sending_animation = true;
          this.$store.commit('change_mail_dialog', false);
          this.success_message('Your message has been sent 🥳');
          setTimeout(() => {this.sending_animation = false}, 1500);
        }).catch(() => {
          this.sending_animation = false;
          this.is_loading = false;
          this.error_message('Something went be wrong<br><em>Please try later </em>. 😞');
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
    mail_dialog (val) {
      if (!val) {
        this.clear_form();
      }
    }
  }
}
</script>