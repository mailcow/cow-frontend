<template>
  <div class="avatar" :style="'background:' + background_color">
    <img v-if="img" :src="img" alt="Avatar" />
    <span v-else>{{avatar_text}}</span>
  </div>
</template>
<script>
export default {
  name: 'TextAvatar',
  data: () => ({
    background_colors: [
      '#F44336', '#FF4081', '#9C27B0', '#673AB7',
      '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688',
      '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107',
      '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B']
  }),
  props: {
    name: {
      type: String,
      default: ''
    },
    img: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    background_color () {
      if (!this.img) {
        var tot = 0;
        tot += this.avatar_text[0].charCodeAt();
        if (this.avatar_text.length > 1) {
          tot += this.avatar_text[1].charCodeAt();
        }
        return this.background_colors[tot % this.background_colors.length];
      }
      return "";
    },
    avatar_text () {
      if (!this.img) {
        var split_data = this.name.split(' ');
        var chracter = split_data[0][0];
          
        if (split_data.length > 1) {
          chracter += split_data[split_data.length - 1][0];
        }
        return chracter.toUpperCase();
      }
      return "";
    }
  }
};
</script>
