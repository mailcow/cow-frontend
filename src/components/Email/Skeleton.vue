<template>
  <article v-if="mode === 'email-list'" class="media email-message pt-4">
    <div class="media-left email-avatar">
      <figure class="image is-48x48">
        <b-skeleton circle width="48px" height="48px"></b-skeleton>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <strong><b-skeleton :width="(Math.floor(Math.random() * 300) + 100) + 'px'"></b-skeleton></strong>
        <p>
          <strong class="is-size-7"><b-skeleton></b-skeleton></strong>
        </p>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  data: () => ({
  }),
  props: {
    mode: {
      type: String,
      required: true
    }
  }
}
</script>
