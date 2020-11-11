<template>
  <aside class="navigation-drawer" :class="{'open': $store.getters.navigation_drawer}">
    <div class="block" style="padding: 1rem; margin-bottom: 0;">
      <b-button type="is-primary" expanded icon-left="pencil">CREATE CONTACT</b-button>
    </div>
    <b-menu>
      <b-menu-list>
        <b-menu-item 
          icon="account"
          class="email-menu-item"
          >
          <template slot="label" class="is-hidden-tablet is-hidden-mobile">
            My Contacts
          </template>
        </b-menu-item>
        <b-menu-item icon="label" style="font-size: 1.25em; font-weight: 400" expanded>
          <template slot="label" slot-scope="props" >
            Labels
            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
          </template>
          <b-menu-item icon="account" label="Family"></b-menu-item>
          <b-menu-item icon="account" label="Important"></b-menu-item>
          <b-menu-item icon="account" label="Jobs"></b-menu-item>
        </b-menu-item>
        <hr>
        <b-menu-item 
          icon="cog"
          class="email-menu-item"
          >
          <template slot="label" class="is-hidden-tablet is-hidden-mobile">
            Settings
          </template>
        </b-menu-item>
        <b-menu-item 
          icon="import"
          class="email-menu-item"
          >
          <template slot="label" class="is-hidden-tablet is-hidden-mobile">
            Import
          </template>
        </b-menu-item>
        <b-menu-item 
          icon="export"
          class="email-menu-item"
          >
          <template slot="label" class="is-hidden-tablet is-hidden-mobile">
            Export
          </template>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </aside>
</template>
<script>
export default {
  name: 'ContactNavigationMenu',
  data: () => ({
  })
};
</script>
