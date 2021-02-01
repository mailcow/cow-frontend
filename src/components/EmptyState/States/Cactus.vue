<template>
  <div class="empty-status-cactus">
    <div class="draw">
      <div class="cactus">
        <div class="arm"></div>
        <div class="arm"></div>
      </div>
      <div class="cactus">
        <div class="arm"></div>
        <div class="arm"></div>
      </div>
      <div  class="cactus">
        <div class="arm"></div>
        <div class="arm"></div>
      </div>
      <div class="sky">
        <div class="montain"></div>
        <div class="montain two"></div>
        <div class="sun"></div>
      </div>
    </div>
    <h1 class="is-size-4 empty-status-bottom-text">{{text}}</h1>
  </div>  
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>
