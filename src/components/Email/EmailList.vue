<template>
  <div>
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
      }
    ]
  })
};
</script>
