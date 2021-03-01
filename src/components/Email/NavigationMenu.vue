<template>
  <aside class="navigation-drawer" :class="{'open': $store.getters.navigation_drawer}">
    <div class="navigation-drawer-overlay" @click="$store.dispatch('toggle_navigation')"></div>
    <div class="block" style="padding: 1rem; margin-bottom: 0;">
      <b-button @click="$store.commit('change_mail_dialog', true)" type="is-primary" expanded icon-left="pencil">{{$t('Email.side_menu.compose')}}</b-button>
    </div>
    <b-menu>
      <b-menu-list>
        <b-menu-item 
          v-for="folder in get_all_folders.default"
          :key="folder.name"
          :active="$route.params.folder === folder.name" 
          :to="{'name': 'EmailFolder', 'params': {'folder': folder.name}}" 
          :icon="folder.icon" 
          tag="router-link" 
          class="email-menu-item"
        >
          <template slot="label" class="is-hidden-tablet is-hidden-mobile">
              {{$t('Email.Folders.' + folder.name)}}
              <div class="is-pulled-right email-count" :class="folder.name" v-if="folder.count && folder.count > 0">
                <span class="text-chip vs-chip--text">{{folder.count}}</span>
              </div>
          </template>
        </b-menu-item>
      </b-menu-list>
      <hr>
      <b-menu-list :label="$t('Email.side_menu.folders')">
        <b-menu-item 
          v-for="other in get_all_folders.other"
          :key="other.id"
          :active="$route.params.folder === other.id" 
          :to="{'name': 'EmailFolder', 'params': {'folder': other.id}, 'query': {'f': other.display_name}}"
          icon="folder" 
          tag="router-link" 
          class="email-menu-item other-folder" 
        >
        <template slot="label" class="is-hidden-tablet is-hidden-mobile">
          {{other.display_name}}
          <div class="is-pulled-right folder-edit">
            <b-icon @click.native="folder_dialog(other)" size="is-small" icon="pencil"></b-icon>
            <b-icon @click.native="delete_folder(other)" size="is-small" icon="delete"></b-icon>
          </div>
        </template>
        </b-menu-item>
        <b-menu-item icon="plus" class="email-menu-item" :label="$t('Email.side_menu.new_folder')" @click="folder_dialog()"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </aside>
</template>
<script>

import EmailService from 'mailcow-services/EmailService';
import { mapGetters } from 'vuex';

export default {
  created () {
  },
  computed: {
    ...mapGetters([
      'get_all_folders'
    ])
  },
  methods: {
    folder_dialog (folder = null) {
      this.$buefy.dialog.prompt({
        message: folder ? this.$t('Email.NewFolderDialog.edit_title') : this.$t('Email.NewFolderDialog.title'),
        inputAttrs: {
          type: 'text',
          required: true,
          placeholder: this.$t('Email.NewFolderDialog.placeholder'),
          value: folder ? folder.display_name : ''
        },
        confirmText: folder ? this.$t('Email.NewFolderDialog.edit') : this.$t('Email.NewFolderDialog.create'),
        cancelText: this.$t('Email.NewFolderDialog.cancel'),
        trapFocus: true,
        closeOnConfirm: false,
        onConfirm: (value, {close}) => {
          if (value.length === 0) {
            return false;
          }
          this.$buefy.toast.open(this.$t('Email.NewFolderDialog.messages.creating_folder'));
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
          this.$buefy.toast.open({'message': this.$t('Email.NewFolderDialog.messages.created'), 'type': 'is-success'});
          this.$store.dispatch('get_folders');
          close();
        }).catch(() => {
          this.$buefy.toast.open({'message': this.$t('Email.NewFolderDialog.messages.error'), 'type': 'is-danger'});
          close();
        });
    },
    edit_folder (folder_id, data, {close}) {
      EmailService.rename_folder(folder_id, data)
        .then(() => {
          this.$buefy.toast.open({'message': this.$t('Email.NewFolderDialog.messages.edited'), 'type': 'is-success'});
          this.$store.dispatch('get_folders');
          close();
        }).catch(() => {
          this.$buefy.toast.open({'message': this.$t('Email.NewFolderDialog.messages.error'), 'type': 'is-danger'});
          close();
        });
    },
    delete_folder (folder) {
      this.$buefy.dialog.confirm({
          title: this.$t('Email.NewFolderDialog.delete_title'),
          message: this.$t('Email.NewFolderDialog.delete_content'),
          confirmText: 'Delete Folder',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            EmailService.delete_folder(folder.id)
              .then(() => {
                this.$buefy.toast.open({'message': this.$t('Email.NewFolderDialog.messages.deleted'), 'type': 'is-success'});
                this.$store.dispatch('get_folders');
              }).catch((err) => {
                if (err.response.data.type === 'invalid_request_error') {
                  this.$buefy.toast.open({'message': this.$t('Email.NewFolderDialog.messages.delete_error', {'folder_name': folder.display_name}), 'type': 'is-danger'});
                } else {
                  this.$buefy.toast.open({'message': this.$t('Email.NewFolderDialog.messages.error'), 'type': 'is-danger'});
                }
              });
          }
      });
    }
  }
}
</script>
