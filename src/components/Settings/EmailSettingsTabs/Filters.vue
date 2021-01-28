<template>
  <div class="container is-fluid settings-view">
    <b-button
      @click="open_filter_dialog"
      type="is-primary"
    >
      Create Filter
    </b-button>
    <new-filter-dialog 
      ref="new_filter_dialog"
      @added="new_filter"
    >
    </new-filter-dialog>
    <!-- {{filters}} -->
    <div class="mt-5">
      <draggable
        v-model="filters"
        class="list-group"
        handle=".handle"
      >
        <div 
          class="box mb-5"
          style="background: #FFF"
          :key="`filter-${index}`"
          v-for="(filter, index) in filters"
        >
          <article class="media">
            <div class="media-left">
              <b-icon
                class="handle c-all-scroll"
                icon="view-headline"
              >
              </b-icon>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{filter.name}}</strong> <small>@mailcow.email</small>
                  <br>
                  type: {{filter.incoming_message}}
                </p>
              </div>
            </div>
            <div class="media-right">
              <b-icon
                @click.native="edit_filter(filter)"
                class="ml-2 c-pointer"
                icon="pencil"
              >
              </b-icon>
              <b-icon
                @click.native="delete_filter(index)"
                class="ml-2 c-pointer"
                icon="delete"
              >
              </b-icon>
            </div>
          </article>
        </div>
      </draggable>
    </div>
    <div 
      v-if="filters.length === 0"
      class="is-justify-content-center is-align-items-center"
    >
      <empty-state mode="page" text="Not yet create any filters"></empty-state>
    </div>
  </div>
</template>
<script>

import EmptyState from 'mailcow-components/EmptyState/State';
import NewFilterDialog from 'mailcow-components/Settings/EmailSettingsTabs/NewFilterDialog';
import draggable from 'vuedraggable';

export default {
  name: 'Filters',
  data: () => ({
    filters: []
  }),
  created () {
  },
  methods: {
    open_filter_dialog () {
      this.$store.commit('set_filter_dialog', true);
    },
    new_filter (filter_data) {
      this.filters.push(filter_data);
    },
    edit_filter (filter_data) {
      this.$refs.new_filter_dialog.open_dialog(filter_data);
    },
    delete_filter (index) {
      this.filters.splice(index, 1);
    } 
  },
  components: {
    'empty-state': EmptyState,
    'new-filter-dialog': NewFilterDialog,
    'draggable': draggable
  }
};
</script>
