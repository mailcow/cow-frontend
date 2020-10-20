<template>
  <component :is="is_mobile ? 'b-modal' : 'div'" v-model="isComponentModalActive" has-modal-card full-screen class="mail-content-container">
    <div class="email-content">
      <div class="email-content-subject">
        <strong>Invation</strong>
          <b-icon
              v-if="is_mobile"
              style="float: right;"
              icon="close"
              @click="isComponentModalActive = false"
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
              <strong>John Smith</strong> <small>@johnsmith</small>
            </p>
          </div>
        </div>
        <div class="media-right">
          <span>06.25 PM</span>
          <br>
          <span>12 Oct 2020</span>
        </div>
      </article>
      <div class="email-content-text">
        <div>
          <p>Hey John, </p>
          <p><br></p>
          <p>bah kivu decrete epanorthotic unnotched Argyroneta nonius veratrine preimaginary saunders demidolmen Chaldaic allusiveness lorriker unworshipping ribaldish tableman hendiadys outwrest unendeavored fulfillment scientifical Pianokoto Chelonia</p>
          <p><br></p>
          <p>Freudian sperate unchary hyperneurotic phlogiston duodecahedron unflown Paguridea catena disrelishable Stygian paleopsychology cantoris phosphoritic disconcord fruited inblow somewhatly ilioperoneal forrard palfrey Satyrinae outfreeman melebiose</p>
        </div>
      </div>
    </div>
  </component>
</template>
<script>

export default {
  data: () => ({
    isComponentModalActive: true,
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
    }
  }
};
</script>
