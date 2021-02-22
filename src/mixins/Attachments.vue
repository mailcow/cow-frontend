<script>

import EmailService from 'mailcow-services/EmailService';

export default {
  methods: {
    download_attachment (attach) {
      EmailService.download_attachment(attach)
        .then(resp => {
          var headers = resp.headers['content-type'];
          var blob = new Blob([resp.body], {type: headers});
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = attach.filename;
          link.click();
        });
    }
  }
};
</script>
