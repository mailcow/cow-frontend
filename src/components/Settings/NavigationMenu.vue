<template>
  <aside class="navigation-drawer" :class="{'open': $store.getters.navigation_drawer}">
    <div style="margin-top: 2em">
      <b-menu>
        <b-menu-list>
          <b-menu-item 
            icon="cog"
            class="email-menu-item"
            :active="$route.name === 'GeneralSettings'" 
            @click="$router.replace({'name': 'GeneralSettings'})"
            >
            <template slot="label" class="is-hidden-tablet is-hidden-mobile">
              General
            </template>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
      <b-menu>
        <b-menu-list>
          <b-menu-item 
            icon="email"
            class="email-menu-item"
            :active="$route.name === 'EmailSettings'"
            @click="$router.replace({'name': 'EmailSettings'})"
            >
            <template slot="label" class="is-hidden-tablet is-hidden-mobile">
              E-Mail
            </template>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'SettingsNavigationMenu',
  data: () => ({
  })
};
</script>
