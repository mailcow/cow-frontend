<template>
  <state-envelope v-if="mode === 'envelope'" :text="text"></state-envelope>
  <state-cactus v-else-if="mode === 'cactus'" :text="text"></state-cactus>
  <state-page v-else-if="mode === 'page'" :text="text" :image="image"></state-page>
</template>
<script>

import Cactus from 'mailcow-components/EmptyState/States/Cactus';
import Envelope from 'mailcow-components/EmptyState/States/Envelope';
import Page from 'mailcow-components/EmptyState/States/Page';

export default {
  data: () => ({
  }),
  props: {
    mode: {
      type: String,
      default: 'envelope'
    },
    image: {
      type: String,
      default: 'page.svg',
      required: false
    },
    text: {
      type: String,
      default: ''
    }
  },
  components: {
    'state-envelope': Envelope,
    'state-cactus': Cactus,
    'state-page': Page,
  }
};
</script>
