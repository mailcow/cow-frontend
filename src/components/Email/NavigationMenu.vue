<template>
  <aside class="navigation-drawer" :class="{'open': $store.getters.navigation_drawer}">
    <div class="navigation-drawer-overlay" @click="$store.dispatch('toggle_navigation')"></div>
    <div class="block" style="padding: 1rem; margin-bottom: 0;">
      <b-button type="is-primary" expanded icon-left="pencil">COMPOSE</b-button>
    </div>
    <b-menu>
      <b-menu-list>
        <b-menu-item 
          v-for="folder in folders.default"
          :key="folder.name"
          :active="$route.params.folder === folder.name" 
          :to="{'name': 'EmailFolder', 'params': {'folder': folder.name}}" 
          :icon="folder.icon" 
          tag="router-link" 
          class="email-menu-item"
        >
          <template slot="label" class="is-hidden-tablet is-hidden-mobile">
              <!-- TODO : i18n with has folder.name -->
              {{folder.name}}
              <div class="is-pulled-right email-count" :class="folder.name" v-if="folder.count && folder.count > 0">
                <span class="text-chip vs-chip--text">{{folder.count}}</span>
              </div>
          </template>
        </b-menu-item>
      </b-menu-list>
      <hr>
      <b-menu-list label="Folders">
        <b-menu-item 
          v-for="other in folders.other"
          :key="other.id"
          :active="$route.params.folder === other.id" 
          :to="{'name': 'EmailFolder', 'params': {'folder': other.id}}"
          icon="folder" 
          tag="router-link" 
          class="email-menu-item" 
        >
        <template slot="label" class="is-hidden-tablet is-hidden-mobile">
          {{other.display_name}}
          <!-- <div class="is-pulled-right" >
            <b-icon size="is-small" icon="delete"></b-icon>
          </div> -->
        </template>
        </b-menu-item>
        <b-menu-item icon="plus" class="email-menu-item" label="New Folder" @click="folder_dialog()"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </aside>
</template>
<script>

import EmailService from 'mailcow-services/EmailService';

export default {
  data: () => ({
    default_folders: {
      inbox: { icon: 'inbox', 'name': 'inbox', 'index': 0 },
      sent: { icon: 'send', 'name': 'sent', 'index': 1 },
      starred: { icon: 'star', 'name': 'starred', 'index': 2 },
      trash: { icon: 'delete', 'name': 'trash', 'index': 3 },
      archive: { icon: 'file', 'name': 'archive', 'index': 4 },
      drafts: { icon: 'email-open', 'name': 'drafts', 'index': 5 },
      spam: { icon: 'alert-circle', 'name': 'spam', 'index': 6 }
    }
  }),
  computed: {
    folders () {
      var folders = {default: [], other: []};
      this.$store.getters.get_folders.forEach((f) => {
        if (f.name && this.default_folders[f.name]) {
          folders.default.push(this.default_folders[f.name]);
        } else {
          folders.other.push(f);
        }
      });
      folders.default.sort(function(a, b) {
          return a.index - b.index;
      });
      return folders;
    }
  },
  created () {
  },
  methods: {
    folder_dialog (folder = null) {

      this.$buefy.dialog.prompt({
        message: 'Create new folder 🖿',
        inputAttrs: {
          type: 'text',
          placeholder: 'Folder name',
          value: folder ? folder.display_name : ''
        },
        confirmText: folder ? 'Edit' : 'Create',
        cancelText: 'Cancel',
        trapFocus: true,
        closeOnConfirm: false,
        onConfirm: (value, {close}) => {
          this.$buefy.toast.open(`Creating folder..`);
          if (folder) {
            this.edit_folder(folder.id, {'display_name': value}, close);
          } else {
            this.new_folder({'display_name': value}, close);
          }
        }
      });
    },
    new_folder(data, close) {
      EmailService.new_folder(data)
        .then(() => {
          this.$buefy.toast.open(`Success, Created your folder`);
          close();
        }).catch(() => {
          this.$buefy.toast.open(`Sorry, something went be wrong! ☹️`);
          close();
        });
    },
    edit_folder (folder_id, data, {close}) {
      EmailService.rename_folder(folder_id, data)
        .then(() => {
          this.$buefy.toast.open(`Success, Created your folder`);
          close();
        }).catch(() => {
          this.$buefy.toast.open(`Sorry, something went be wrong! ☹️`);
          close();
        });
    },
    delete_folder (folder) {
      this.$buefy.dialog.confirm({
          title: 'Deleting folder',
          message: 'Are you sure you want to <b>delete</b> your folder? This action cannot be undone.',
          confirmText: 'Delete Folder',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.$buefy.toast.open('Account deleted!' + folder.id)
      });
    }
  }
}
</script>
