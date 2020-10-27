<template>
  <component v-if="selected_email" :is="is_mobile ? 'b-modal' : 'div'" v-model="dialog" has-modal-card full-screen class="mail-content-dialog" :class="{'mail-content-container': !is_mobile}">
    <div class="email-content">
      <div class="email-content-subject">
        <strong>{{message.subject}}</strong>
          <b-icon
              v-if="is_mobile"
              style="float: right;"
              icon="close"
              @click.native="close_mail_dialog"
              >
          </b-icon>
      </div>
      <article class="media email-content-header">
        <figure class="media-left">
          <p class="image is-64x64">
            <img style="border-radius: 50%" src="https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{message.from[0].name}}</strong><br/>
              <small>{{message.from[0].email}}</small>
            </p>
          </div>
        </div>
        <div class="media-right">
          <span>{{message.date}}</span>
          <br>
          <span>12 Oct 2020</span>
        </div>
      </article>
      <div class="email-content-text">
        <div v-html="message.body">
          <!-- ::{{a}}::
          <p>Hey John, </p>
          <p><br></p>
          <p>bah kivu decrete epanorthotic unnotched Argyroneta nonius veratrine preimaginary saunders demidolmen Chaldaic allusiveness lorriker unworshipping ribaldish tableman hendiadys outwrest unendeavored fulfillment scientifical Pianokoto Chelonia</p>
          <p><br></p>
          <p>Freudian sperate unchary hyperneurotic phlogiston duodecahedron unflown Paguridea catena disrelishable Stygian paleopsychology cantoris phosphoritic disconcord fruited inblow somewhatly ilioperoneal forrard palfrey Satyrinae outfreeman melebiose</p> -->
        </div>
      </div>
    </div>
  </component>
  <div v-else class="is-justify-content-center is-align-items-center mail-content-container is-hidden-touch">
      <empty-state mode="envelope" text="No selected any email"></empty-state>
  </div>
</template>
<script>

import EmptyState from './EmptyState';

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
  computed: {
    is_mobile () {
      return this.window.width < 770;
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
    close_mail_dialog () {
      this.dialog = false;
      this.selected_email = null;
      this.message = {}; 
    },
    get_message () {
      this.message = this.$store.getters.get_message(this.$route.params.message_id);
      // var elmnt = document.getElementsByClassName("mail-content-container");
      // if (elmnt) {
      //   elmnt[0].scrollTop = 0;
      // }
      this.dialog = true;
      this.selected_email = true;
    }
  },
  components: {
    'empty-state': EmptyState
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
