<template>
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
</template>
<script>
export default {
  data: () => ({
    reduce: false,
    mobile: 'reduce'
  })
}
</script>
