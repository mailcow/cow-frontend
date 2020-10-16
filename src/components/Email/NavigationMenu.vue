<template>
  <aside class="aside is-placed-left is-expanded">
    <div class="block" style="padding: 1rem; margin-bottom: 0;">
      <b-button type="is-primary" expanded icon-left="pencil">COMPOSE</b-button>
    </div>
    <b-menu>
      <b-menu-list>
        <b-menu-item icon="inbox" class="email-menu-item">
          <template slot="label" class="is-hidden-tablet is-hidden-mobile">
              Inbox
              <div class="is-pulled-right email-count inbox">
                <span class="text-chip vs-chip--text">2</span>
              </div>
          </template>
        </b-menu-item>
        <b-menu-item class="email-menu-item" icon="send" label="Sent"></b-menu-item>
        <b-menu-item class="email-menu-item" icon="star" label="Starred"></b-menu-item>
        <b-menu-item class="email-menu-item" icon="delete" label="Trash"></b-menu-item>
        <b-menu-item class="email-menu-item" icon="file" label="Archive"></b-menu-item>
        <b-menu-item icon="email-open" class="email-menu-item">
          <template slot="label" class="is-hidden" >
            Drafts
            <div class="is-pulled-right email-count draft">
              <span class="text-chip vs-chip--text">4</span>
            </div>
          </template>
        </b-menu-item>
        <b-menu-item icon="alert-circle" class="email-menu-item" label="Spam"></b-menu-item>
      </b-menu-list>
      <hr>
      <b-menu-list label="Folders">
        <b-menu-item icon="folder" class="email-menu-item" label="Personal"></b-menu-item>
        <b-menu-item icon="plus" class="email-menu-item" label="New Folder"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </aside>
</template>
