<template>
  <div>
    <section>
      <b-modal
        v-model="attach_dialog"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal>
        <template>
          <div class="modal-card" style="width: 800px">
            <header class="modal-card-head">
              <p class="modal-card-title">
                Email Attachment
                <span
                  v-if="total_size > 0"
                  class="ml-3"
                >
                  ({{total_size | get_size}})
                </span>
              </p>
              <button
                type="button"
                class="delete"
                @click="close_dialog"
              />
            </header>
            <section class="modal-card-body">
              <ul>
                <li
                  v-for="(file, index) in files"
                  :key="`attach-file-${index}`"
                >
                  <div class="card" style="box-shadow: 0">
                    <div class="card-content">
                      <div class="media">
                        <div class="media-left">
                          <figure style="margin: auto;" class="image is-48x48">
                            <b-icon
                              type="is-primary"
                              size="is-large"
                              :icon="get_file_icon(file)"
                            >
                            </b-icon>
                          </figure>
                        </div>
                        <div class="media-content">
                          <p class="title is-6">
                            {{file.name}}
                            <b-tag
                              class="ml-2"
                              v-if="file.is_new"
                              type="is-success">New!
                            </b-tag>
                          </p>
                          <p class="subtitle is-6">{{file.size | get_size}}</p>
                        </div>
                        <div class="media-right">
                          <b-tooltip 
                            label="Remove file"
                            position="is-left"
                          >
                            <b-icon
                              @click.native="$emit('delete', index)"
                              icon="delete"
                              class="c-pointer"
                            >
                            </b-icon>
                          </b-tooltip>
                        </div>
                        <div class="media-right">
                          <b-tooltip 
                            label="Download file"
                            position="is-left"
                          >
                            <b-icon
                                icon="download"
                                class="c-pointer"
                              >
                            </b-icon>
                          </b-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                v-if="files.length === 0"
              >
                <h2>Not yet attachet any file</h2>
              </div>
            </section>
            <footer class="modal-card-foot">
              <b-button
                @click.native="$refs.file.click()"
                icon-left="paperclip"
              >
                Add file from your pc
              </b-button>
            </footer>
          </div>
        </template>
      </b-modal>
    </section>
    <input
      class="display-none"
      type="file" 
      ref="file"
      multiple
      @change="change_input"
    >
    <slot
      name="button"
      v-bind:dialog="toggle_dialog"
    ></slot>
  </div>
</template>
<script>

import EmailService from 'mailcow-services/EmailService';
import {mapGetters} from 'vuex';

export default {
  data: () => ({
    attach_dialog: false,
    raw_files: []
  }),
  created () {
  },
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'config_settings'
    ]),
    total_size () {
      const cur_total = this.files.reduce((accumulator, current_value) => {return accumulator + current_value.size}, 0);
      let raw_total = 0;
      for (let file of this.raw_files) {
        raw_total += file.size;
      }
      return cur_total + raw_total;
    }
  },
  methods: {
    toggle_dialog () {
      this.attach_dialog = !this.attach_dialog;
    },
    upload_file (form_data, f) {
      EmailService.uplpad_attachment(form_data)
        .then((resp) => {
          this.$emit('uploaded', resp.data[0], f);
          if (resp.data.length > 0) {
            //
          }
        })
    },
    get_file_icon (file) {
      let content_type = file.type || file.content_type || '';
      let type_data = content_type.split('/');

      if (type_data[1].toLowerCase() == 'pdf') {
        return 'file-pdf';
      }

      let file_type = type_data[0].toLowerCase();

      const file_type_map = {
        application: 'file-code',
        text: 'file-document',
        video: 'file-video',
        audio: 'file-music',
        font: 'format-text',
        image: 'file-image',
      };

      if (file_type_map[file_type]) {
        return file_type_map[file_type];
      }

      return 'file';
    },
    change_input (ev) {
      this.raw_files = ev.target.files

      if (this.total_size > this.config_settings.max_attach_size) {
        this.$buefy.snackbar.open({
            duration: 3000,
            message: `This email has reached its maximum file size limit that can be attached 😕`,
            type: 'is-danger',
            position: 'is-top',
            actionText: 'CLOSE',
            queue: true
        });
        this.raw_files = [];
        return false;
      }

      for (let file of this.raw_files) {
        let form_data = new FormData();
        console.log('FILE', file);
        file.is_new = true;
        form_data.append('file', file);
        form_data.append('name', file.name);
        this.upload_file(form_data, file);
      }
      this.raw_files = [];
    },
    close_dialog () {
      this.attach_dialog = false;
    }
  },
  watch: {
  }
};
</script>
