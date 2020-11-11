<template>
  <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
    <a
      class="navbar-item"
      slot="trigger"
      role="button"
      style="padding: 0"
      >
        <b-icon icon="dots-vertical"></b-icon>
    </a>
    <b-dropdown-item custom aria-role="menuitem">
      Move <b>To</b>
    </b-dropdown-item>
    <hr class="dropdown-divider">
    <b-dropdown-item @click="move_message(folder.id)" :key="`def-folder-${folder.name}`" v-for="folder in default_folders_filtered"  aria-role="menuitem">
      <span>
        <b-icon size="is-small" :icon="folder.icon"></b-icon>
        {{folder.name}}
      </span>
    </b-dropdown-item>
    <hr class="dropdown-divider">
    <b-dropdown-item @click="move_message(folder.id)" :key="`other-folder-${folder.id}`" v-for="folder in other_folders_filtered" aria-role="menuitem">
      <span>
        <b-icon size="is-small" icon="folder"></b-icon>
        {{folder.display_name}}
      </span>
    </b-dropdown-item>
    <hr class="dropdown-divider">
    <b-dropdown-item @click="change_read(false)" aria-role="menuitem">
      <span>
        <b-icon size="is-small" icon="eye-check"></b-icon>
        Mark as a read
      </span>
    </b-dropdown-item>
    <b-dropdown-item @click="change_read(true)" aria-role="menuitem">
      <span>
        <b-icon size="is-small" icon="eye-off"></b-icon>
        Mark as a unread
      </span>
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>

import EmailFolders from 'mailcow-mixins/EmailFolders';

export default {
  mixins: [EmailFolders],
  props: {
    message: {
      type: [Object, Boolean],
      required: false,
      default: () => {return false;}
    }
  },
  computed: {
    default_folders_filtered () {
      return this.folders.default.filter((f) => { return f.name !== this.$route.params.folder});
    },
    other_folders_filtered () {
      return this.folders.other.filter((f) => { return f.id !== this.$route.params.folder});
    }
  },
  methods: {
    move_message (folder_id) {
      if (this.message) {
        const msg = {'folder_id': folder_id};
        this.$store.dispatch('update_message', {'mail_id': this.message.id, 'message': msg});
      } else {
        this.$store.dispatch('update_messages', {'folder_id': folder_id});
      }
      this.$router.replace({'name': 'EmailFolder', 'params': {}});
    },
    change_read (status = null) {
      if (this.message) {
        const msg = {'unread': !this.message.unread};
        this.$store.dispatch('update_message', {'mail_id': this.message.id, 'message': msg, 'no_update': true});
        this.message.unread = !this.message.unread;
      } else {
        this.$store.dispatch('update_messages', {'unread': status});
      }
    }
  }
};
</script>
