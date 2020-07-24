<template>
  <div>
    <b-navbar style="border-bottom: 1px solid #dae1e7;">
      <template slot="brand" >
        <b-navbar-item tag="router-link" :to="{ path: '/' }" style="margin: 0px 35px">
          <img src="https://www.debinux.de/256.png" alt="MailCow">
          <h1 style="padding: 7px 10px; font-weight: 500; font-size: 20px">MAILCOW</h1>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#" active>
          <b-icon icon="email-open-outline"></b-icon>
        </b-navbar-item>
        <b-navbar-item href="#">
          <b-icon icon="calendar"></b-icon>
        </b-navbar-item>
        <b-navbar-item href="#">
          <b-icon icon="checkbox-marked-outline"></b-icon>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-icon style="margin: 15px 10px 0px 0px" icon="magnify"></b-icon>
        <b-icon style="margin: 15px 10px 0px 0px" icon="bell"></b-icon>
        <figure class="image is-32x32" style="margin: 10px">
          <img style="border-radius: 50%" src="https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png">
        </figure>
      </template>
    </b-navbar>
    <div class="columns is-fullheight" style="padding: 0.75rem">
      <b-sidebar 
        :mobile="mobile"
        :reduce="reduce"
        class="is-sidebar-menu"
        fullheight
        position="static"
        type="is-sidebar"
        open
        >
        <div>
          <div class="blocka" style="padding: 1.5rem">
            <b-button class="is-hidden-touch" type="is-mail-compose-button" expanded icon-left="pencil">COMPOSE</b-button>
            <b-button class="is-hidden-desktop" type="is-mail-compose-button" expanded>+</b-button>
          </div>
          <b-menu class="is-custom-mobile" style="padding: 0rem .5rem">
            <b-menu-list>
              <b-menu-item style="font-size: 1.25em; font-weight: 400" icon="inbox">
                <template slot="label" class="is-hidden-tablet is-hidden-mobile">
                    Inbox
                    <div class="is-pulled-right" style="font-size: 10px; height: 20px; width: 20px; border-radius: 50%; line-height: 20px; text-align: center; background: #7367f0; color: rgba(255, 255, 255, 0.9);">
                      <span class="text-chip vs-chip--text">2</span>
                    </div>
                  
                </template>
              </b-menu-item>
              <b-menu-item style="font-size: 1.25em; font-weight: 400" icon="send" label="Sent"></b-menu-item>
              <b-menu-item style="font-size: 1.25em; font-weight: 400" icon="star" label="Starred"></b-menu-item>
              <b-menu-item style="font-size: 1.25em; font-weight: 400" icon="delete" label="Trash"></b-menu-item>
              <b-menu-item style="font-size: 1.25em; font-weight: 400" icon="file" label="Archive"></b-menu-item>
              <b-menu-item style="font-size: 1.25em; font-weight: 400" icon="email-open">
                <template slot="label" class="is-hidden-tablet is-hidden-mobile">
                  Drafts
                  <div class="is-pulled-right" style="font-size: 10px; height: 20px; width: 20px; border-radius: 50%; line-height: 20px; text-align: center; background: #ff9f43; color: rgba(255, 255, 255, 0.9);">
                    <span class="text-chip vs-chip--text">4</span>
                  </div>
                </template>
              </b-menu-item>
              <b-menu-item style="font-size: 1.25em; font-weight: 400" icon="alert-circle" label="Spam"></b-menu-item>
            </b-menu-list>
            <hr>
            <b-menu-list label="Folders">
              <b-menu-item style="font-size: 1.0em; font-weight: 400" icon="folder" label="Personal"></b-menu-item>
              <b-menu-item style="font-size: 1.0em; font-weight: 400" icon="plus" label="New Folder"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
      <div class="column is-main-content ">
        <div class="columns" style="height: 100%">
          <div class="column is-4" style="padding: 2px; overflow-x: hidden; background: #f8f8f8">
            <div style="height: 50px; border-bottom: 1px solid #dae1e7;">
              <b-checkbox  style="margin: 15px 22px">Select All</b-checkbox>
              <small style="padding: 13px" class="is-pulled-right">
                <b-icon icon="chevron-left" size="is-small" ></b-icon>
                1-20 of 16
                <b-icon size="is-small" icon="chevron-right" ></b-icon>
              </small>
            </div>
            <div style="border-bottom: 1px solid #dae1e7;">
              <article class="media" v-for="(message, i) in messages" :key="i" style="padding: 10px; margin: 0">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img class="is-rounded" :src="message.avatar" alt="Image">
                  </figure>
                  <b-checkbox size="is-small" style="margin: 16px"></b-checkbox>
                </div>
                <div class="media-content">
                  <div class="content">
                    <strong>{{message.owner}}</strong>
                    <small style="padding-left: 10px">{{message.email}}</small>
                    <p>
                      <strong style="font-weight: 500; font-size: 12px">Invation</strong>
                      <br>
                      {{message.snippet}}
                    </p>
                  </div>
                </div>
                <div class="media-right">
                  <div>
                    <small class="is-pulled-right">31m</small>
                  </div>
                  <div>
                    <small class="is-pulled-right">
                      <b-icon icon="paperclip" ></b-icon>
                    </small>
                  </div>
                  <div>
                    <small class="is-pulled-right">
                      <b-icon icon="star-outline" style="margin-top: 10px" ></b-icon>
                    </small>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="column is-8" style="padding: 2px; border-left: 1px solid #dae1e7 ">
            <div style="height: 50px; border-bottom: 1px solid #dae1e7; padding: 12px 20px">
              <strong>Invation</strong>
            </div>
            <article class="media" style="padding: 10px 20px">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img style="border-radius: 50%" src="https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>John Smith</strong>
                    <br>
                    <small>john@mailcow.email</small>
                    <br>
                  </p>
                </div>
              </div>
              <div class="media-right">
                <span>06.25 PM</span>
                <br>
                <span>12 Oct 2020</span>
              </div>
            </article>
            <hr style="margin: 0px 0px 15px 0px;">
            <div style="padding: 20px">
              <div>
                <p>Hey John, </p>
                <p><br></p>
                <p>bah kivu decrete epanorthotic unnotched Argyroneta nonius veratrine preimaginary saunders demidolmen Chaldaic allusiveness lorriker unworshipping ribaldish tableman hendiadys outwrest unendeavored fulfillment scientifical Pianokoto Chelonia</p>
                <p><br></p>
                <p>Freudian sperate unchary hyperneurotic phlogiston duodecahedron unflown Paguridea catena disrelishable Stygian paleopsychology cantoris phosphoritic disconcord fruited inblow somewhatly ilioperoneal forrard palfrey Satyrinae outfreeman melebiose</p>
              </div>
            </div>
            <div style="padding: 15px">
              <h1 style="display: flex">
                <b-icon icon="paperclip"></b-icon>
                ATTACHMENTS
              </h1>
              <hr style="margin: 10px 0px 15px 0px;">
              <div class="control">
                <b-taglist attached >
                  <b-tag type="is-twitter">Resume.pdf <small>(1.1MB)</small></b-tag>
                  <b-tag type="is-info">
                    <b-icon size="is-small" icon="download"></b-icon>
                  </b-tag>
                </b-taglist>
                <b-taglist attached >
                  <b-tag type="is-twitter">Profile.png <small>(1MB)</small></b-tag>
                  <b-tag type="is-info">
                    <b-icon size="is-small" icon="download"></b-icon>
                  </b-tag>
                </b-taglist>
                <b-taglist attached >
                  <b-tag type="is-twitter">Cover.pdf <small>(758Kb)</small></b-tag>
                  <b-tag type="is-info">
                    <b-icon size="is-small" icon="download"></b-icon>
                  </b-tag>
                </b-taglist>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
      messages: [
        {
          owner: 'John Dear',
          avatar: 'https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png',
          email: 'john@mailcow.email',
          snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit purus....'
        },
        {
          owner: 'Peer Thorp',
          avatar: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
          email: 'peer@mailcow.email',
          snippet: 'Cras malesuada purus nibh, et fermentum ligula pretium eu. Nullam nunc libero...'
        },
        {
          owner: 'Urs Morley',
          avatar: 'https://pickaface.net/gallery/avatar/unr_random_180527_1151_2bcb7h9.png',
          email: 'urs@mailcow.email',
          snippet: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae...'
        },
        {
          owner: 'Manolito Sherwood',
          avatar: 'https://pickaface.net/gallery/avatar/Dorka123551177b601b1e.png',
          email: 'manolito@mailcow.email',
          snippet: 'Curabitur egestas justo ac turpis varius, et rhoncus nibh imperdiet...'
        },
        {
          owner: 'Rawlings Chester',
          avatar: 'https://pickaface.net/gallery/avatar/unr_randomsuburbguy_170104_0514_qxi74z8.png',
          email: 'rawlings@mailcow.email',
          snippet: 'Proin dapibus rutrum laoreet. Integer viverra vitae tortor sit amet ullamcorper..'
        }
      ]
    };
  }
};
</script>
<style lang="scss">

@import "./assets/scss/app";

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
