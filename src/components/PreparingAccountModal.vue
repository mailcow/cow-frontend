<template>
  <b-modal 
      v-model="dialog"
      has-modal-card
      full-screen 
      :can-cancel="false"
    >
      <div class="modal-card" style="width: auto">
        <section class="modal-card-body">
          <b-loading :is-full-page="true" v-model="dialog" :can-cancel="false"></b-loading>
          <h1>Preparing your account</h1>
        </section>
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
