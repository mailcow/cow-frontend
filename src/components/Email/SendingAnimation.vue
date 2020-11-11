<template>
  <div v-if="loading" class="sending-email">
    <div class="ring"></div>
    <div class="circle"></div>
    <svg class="mail">
      <polyline points="119,1 119,69 1,69 1,1"></polyline>
      <polyline points="119,1 60,45 1,1 119,1"></polyline>
    </svg>
    <svg class="plane">
      <polyline points="119,1 1,59 106,80 119,1"></polyline>
      <polyline points="119,1 40,67 43,105 69,73"></polyline>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'SendingAnimation',
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
