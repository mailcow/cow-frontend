<template>
  <div class="empty-status-page">
    <img width="400" :src="require(`@/assets/States/${image}`)" />
    <h1 class="is-size-4 empty-status-bottom-text">{{text}}</h1>
  </div>  
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
  }
};
</script>
