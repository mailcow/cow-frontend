<template>
  <b-modal
      v-model="dialog"
      has-modal-card
      full-screen 
      :can-cancel="false"
    >
    <div class="modal-card" style="width: auto">
    <div class="prepating-conatiner">
      <div class="preparing-envelope">
          <div class="letter">
              <div class="shadow"></div>
              <div class="background"></div>
              <div class="body"></div>
          </div>
        <h1 class="title is-size-4 loading-text">Hold on, we are preparing your account. moohoo🐮</h1>
      </div>
    </div>
  </div>

  </b-modal>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  }
}
</script>
