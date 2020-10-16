<template>
  <div>
    <navigation-menu></navigation-menu>
    <div class="columns is-gapless is-fullheight">
      <div class="column is-4 messages is-fullheight" id="message-feed">
        <email-list></email-list>
      </div>
      <div class="column is-8 is-fullheight" id="message-pane">
        <email-content></email-content>
      </div>
    </div>
  </div>
</template>

<script>

import NavigationMenu from 'mailcow-components/Email/NavigationMenu';
import EmailList from 'mailcow-components/Email/EmailList';
import EmailContent from 'mailcow-components/Email/EmailContent';

export default {
  name: 'Email',
  components: {
    'navigation-menu': NavigationMenu,
    'email-list': EmailList,
    'email-content': EmailContent
  }
}
</script>

