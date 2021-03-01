<template>
  <b-modal 
    id="filter-modal"
    v-model="filter_dialog"
    :destroy-on-hide="false"
    :can-cancel="false"
    has-modal-card
    trap-focus
    aria-role="dialog"
    aria-modal
  >
    <template>
      <div class="modal-card" style="width:100%">
        <form ref="form">
            <header class="modal-card-head">
              
                <b-field
                >
                  <b-input
                    required
                    v-model="filters_data.name"
                    placeholder="Filter Name.."
                  >
                  </b-input>
                </b-field>

            </header>
            <section class="modal-card-body">
              <b-field
                required
                label="For incoming messages that"
              >
                <b-select
                  placeholder="Select Incomin message"
                  expanded 
                  v-model="filters_data.incoming_message"
                >
                  <option
                    :key="option.id"
                    v-for="option in incoming_messages_op" 
                    :value="option.id">{{option.name}}
                  </option>
                </b-select>
                <p 
                  class="control" 
                  v-if="filters_data.incoming_message !== 'match_all'"
                  >
                  <b-button
                    @click="add_condition"
                    icon-left="plus"
                  >
                    Add a condition
                  </b-button>
                </p>
              </b-field>
              <div 
                v-if="filters_data.incoming_message !== 'match_all'"
              >
                  <b-field
                    required
                    grouped
                    :key="`conditaion-${index}`"
                    v-for="(condition, index) in filters_data.conditions"
                  >

                      <b-select
                        required
                        placeholder="selector"
                        expanded 
                        v-model="condition.selector"
                      >
                        <option
                          :key="`condition-category-${category.id}`"
                          v-for="category in condition_categoris"
                          :value="category.id">{{category.id}}
                        </option>
                      </b-select>

                    <template
                      v-for="(field, index) in condition_schema[condition.selector]"
                    >
                      <b-select
                        required
                        :key="`condition-field-${index}`"
                        v-if="field.type === 'select'"
                        :placeholder="field.name"
                        expanded
                        v-model="condition[field.name]"
                      >
                        <option
                          :key="`condition-item-${item.id}`"
                          v-for="item in field.items"
                          :value="item.id">{{item.id}}
                        </option>
                      </b-select>
                      <b-field
                        
                        :key="`condition-field-${index}`"
                        v-else-if="field.type === 'text'"
                        expanded
                      >
                        <b-input
                           required
                          :placeholder="field.name"
                          v-model="condition[field.name]"
                        >
                        </b-input>
                      </b-field>
                    </template>
                    <b-button
                      @click="remove_condition_from_list(index)"
                    >
                      <b-icon
                        icon="delete"
                        size="is-small"
                      >
                      </b-icon>
                    </b-button>
                  </b-field>

              </div>
              <h2 class="has-text-weight-semibold mb-2 mt-2">
                Perform these actions
              </h2>
              <b-button
                @click="add_action"
                class="mb-2"
                icon-left="plus"
              >
                Add an action
              </b-button>
              <draggable v-model="filters_data.actions"  class="list-group" handle=".handle">
                <div v-for="(action, index) in filters_data.actions" :key="action.id">
                    <div
                      style="display: none"
                    >
                      {{action.order = index}}
                    </div>
                    <b-field
                      grouped
                    >
                      <b-icon
                        class="handle mr-2"
                        icon="view-headline"
                        size="is-small"
                        style="margin: auto; cursor: all-scroll"
                        >
                      </b-icon>
                      <b-select
                        required
                        placeholder="Action type"
                        v-model="action.type"
                        expanded
                        style="width:100%"
                        class="mb-2"
                      >
                        <option 
                          :key="`action-category-${category.id}`"
                          v-for="category in action_categoris" 
                          :value="category.id">{{category.id}}
                        </option>
                      </b-select>
                      <template 
                        v-for="(field, index) in action_schema[action.type]"
                      >
                        <b-select
                          required
                          :key="`action-field-${index}`"
                          v-if="field.type === 'select'"
                          :placeholder="field.title"
                          expanded
                          v-model="action[field.name]"
                        >
                          <template v-if="field.store">
                            <option
                              :key="`action-item-${item.id}`"
                              v-for="item in $store.getters[field.items]"
                              :value="item.display_name"
                            >
                              {{item.display_name}}
                            </option>
                          </template>
                          <template v-else>
                            <option
                              :key="`action-item-${item.id}`"
                              v-for="item in field.items"
                              :value="item.id"
                            >
                              {{item.id}}
                            </option>
                          </template>
                        </b-select>
                        <b-field
                          :key="`action-field-${index}`"
                          v-if="field.type === 'text'"
                          expanded
                        >
                          <b-input
                            required
                            v-model="action[field.name]"
                            :placeholder="field.name"
                          >
                          </b-input>
                        </b-field>
                      </template>
                      <b-button 
                        @click="remove_action_from_list(index)"
                        class="ml-2"
                      >
                        <b-icon
                          icon="delete"
                          size="is-small"
                          >
                        </b-icon>
                      </b-button>
                    </b-field>
                </div>
              </draggable>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="close">Close</button>
              <button class="button" type="button" @click="add_filter">Save</button>
            </footer>
        </form>
      </div>
    </template>
  </b-modal>
</template>
<script>

import {filters_settings_schemas} from 'mailcow-utils';
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';

export default {
  data: () => ({
    edit_mode: false,
    filters_data: {incoming_message: 'match_all_flowing_rules', conditions: [], actions: []},
    incoming_messages_op: [
      {id: 'match_all_flowing_rules', name: 'Match all of the following rules'},
      {id: 'match_any_flowing_rules', name: 'Match any of following rules'},
      {id: 'match_all', name: 'Match all messages'},
    ]
  }),
  created () {
  },
  methods: {
    close () {
      this.filters_data = {incoming_message: 'match_all_flowing_rules', conditions: [], actions: []};
      this.edit_mode = false;
      this.$store.commit('set_filter_dialog', false);
    },
    open_dialog (data = null) {
      this.$store.commit('set_filter_dialog', true);
      if (data) {
        this.edit_mode = true;
        this.filters_data = data; // Object.assign({}, data);
      }
    },
    add_condition () {
      this.filters_data.conditions.push({selector: 'subject'});
    },
    add_action () {
      this.filters_data.actions.push({type: 'discard_message'});
    },
    remove_condition_from_list (index) {
      this.filters_data.conditions.splice(index, 1);
    },
    remove_action_from_list (index) {
      this.filters_data.actions.splice(index, 1);
    },
    add_filter () {
      let form_is_valid = this.$refs.form.checkValidity();


      if (form_is_valid && ((this.filters_data.incoming_message === 'match_all' || this.filters_data.conditions.length) && this.filters_data.actions.length)) {
        this.$emit('added', this.filters_data, this.edit_mode);
        this.close();
      } else {
        this.$buefy.snackbar.open({
            duration: 2000,
            message: 'Please check form',
            type: 'is-danger',
            position: 'is-top',
            actionText: 'Close',
            queue: false
        });
      }
    }
  },
  computed: {
    ...mapGetters([
      'filter_dialog'
    ]),
    condition_schema () {
      return filters_settings_schemas.condition_schema;
    },
    condition_categoris () {
      return Object.keys(this.condition_schema).map(c => {return {'id': c}});
    },
    action_schema () {
      return filters_settings_schemas.action_schema;
    },
    action_categoris () {
      return Object.keys(this.action_schema).map(a => {return {'id': a}});
    }
  },
  components: {
    draggable
  }
};
</script>
