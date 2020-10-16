<template>
  <section class="email-list full-height">
    <div class="email-messages-action">
      <b-checkbox  style="margin: 15px 22px">Select All</b-checkbox>
      <small style="padding: 13px" class="is-pulled-right">
        <b-icon icon="chevron-left" size="is-small" ></b-icon>
        1-20 of 16
        <b-icon size="is-small" icon="chevron-right" ></b-icon>
      </small>
    </div>
    <div class="email-messages">
      <article class="media" v-for="(message, i) in messages" :key="i" style="padding: 10px; margin: 0">
        <div class="media-left email-avatar">
          <figure class="image is-48x48">
            <img class="is-rounded" :src="message.avatar" alt="Image">
          </figure>
          <!-- <b-checkbox size="is-small" style="margin: 16px"></b-checkbox> -->
        </div>
        <div class="media-content">
          <div class="content">
            <strong>{{message.owner}}</strong>
            <small class="pl-2">{{message.email}}</small>
            <p>
              <strong class="is-size-7">Invation</strong>
              <br>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing..</span>
            </p>
          </div>
        </div>
        <div class="media-right">
          <div>
            <small class="is-pulled-right">31m</small>
          </div>
          <div>
            <small class="is-pulled-right">
              <b-icon icon="attachment" ></b-icon>
            </small>
          </div>
          <div>
            <small class="is-pulled-right">
              <b-icon icon="star-outline" ></b-icon>
            </small>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
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
  })
};
</script>
