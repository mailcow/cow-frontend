<template>
  <div id="app">
    <router-view/>
    <new-mail-dialog></new-mail-dialog>
    <new-account-dialog></new-account-dialog>
  </div>
</template>
<script>

import NewEmailDialog from 'mailcow-components/Email/NewEmailDialog';
import NewAccountDialog from 'mailcow-components/Account/NewAccountDialog';

export default {
  data: () => ({
  }),
  created () {
  },
  components: {
    'new-mail-dialog': NewEmailDialog,
    'new-account-dialog': NewAccountDialog
  }
};
</script>
