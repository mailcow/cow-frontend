<template>
  <div>
    <div class="columns is-fullheight" style="padding: 0.75rem">
      <navigation-menu></navigation-menu>
      <div class="column is-main-content ">
        <div class="columns" style="height: 100%">
          <div class="column is-4" style="padding: 2px; overflow-x: hidden; background: #f8f8f8">
            <email-list></email-list>
          </div>
          <div class="column is-8" style="padding: 2px; border-left: 1px solid #dae1e7 ">
            <email-content></email-content>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import EmailService from 'mailcow-services/EmailService';
import UserService from 'mailcow-services/UserService';
import NavigationMenu from 'mailcow-components/Email/NavigationMenu';
import EmailList from 'mailcow-components/Email/EmailList';
import EmailContent from 'mailcow-components/Email/EmailContent';

export default {
  data: () => ({
  }),
  created () {
    EmailService.ping().
      then(resp => {
        console.log('??? :: ', resp);
      });
  },
  methods: {
    login () {
      UserService.login({'email': 'test@test.com', 'password': '123'}).
        then(resp => {
          alert(1);
        });
    },
    logout () {
      UserService.logout().
        then(resp => {
          alert(2);
        });
    }
  },
  components: {
    'email-list': EmailList,
    'email-content': EmailContent,
    'navigation-menu': NavigationMenu
  }
};
</script>
<style lang="scss">

$navbar-height: 61px;

.columns {
    &.is-fullheight {
        min-height: calc(100vh - ( #{$navbar-height} - .75rem ));
        max-height: calc(100vh - ( #{$navbar-height} - .75rem ));
        height: calc(100vh - ( #{$navbar-height} - .75rem ));
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        .column {
           overflow-y: auto;
        }
    }
}

@media screen and (max-width: 1023px) {
    .b-sidebar {
        .sidebar-content {
            border-right: 1px solid #dae1e7;
            &.is-mini-mobile {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            border-right: 1px solid #dae1e7;
            &.is-mini {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}


</style>
