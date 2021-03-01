<template>
  <div>
    <navigation-menu></navigation-menu>
    <div class="is-justify-content-center is-align-items-center mail-content-container is-hidden-touch">
      <empty-state mode="page" image="contact.svg" text="You don't have any contact yet"></empty-state>
    </div>
  </div>
</template>

<script>

import NavigationMenu from 'mailcow-components/Contact/NavigationMenu';
import EmptyState from 'mailcow-components/EmptyState/State';

export default {
  name: 'Contact',
  data: () => ({
  }),
  components: {
    'navigation-menu': NavigationMenu,
    'empty-state': EmptyState,
  },
  methods: {
  }
}
</script>
