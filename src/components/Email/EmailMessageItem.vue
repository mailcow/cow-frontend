<template>
  <article
    @click="select_message"
    class="media email-message" 
    :class="{'email-unread': message.unread, 'email-selected': $route.params.message_id === message.id}"
  >
    <div class="media-left email-avatar">

<!-- <div class="avatar">
  <a href="https://codepen.io/MarioDesigns/">
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/skytsunami.png" alt="Skytsunami" />
  </a>
</div> -->

      <figure class="image is-48x48">
        <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
      </figure>
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
        <small class="is-pulled-right">3 mont</small>
      </div>
      <div>
        <small class="is-pulled-right">
          <b-icon  icon="attachment" ></b-icon>
        </small>
      </div>
      <div >
        <small class="is-pulled-right">
          <b-icon icon="star-outline"></b-icon>
        </small>
      </div>
    </div>
  </article>
</template>
<script>
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
  }
};
</script>
<style>
.avatar {
  width: 48px;
  height: 48px;
  box-sizing: border-box;
  border: 2px white solid;
  border-radius: 50%;
  overflow: hidden;
  transform: translatey(0px);
  img { width: 100%; height: auto; }
}

.media-content {
    text-overflow: ellipsis !important;
    overflow: hidden;
    white-space: nowrap;

}
</style>