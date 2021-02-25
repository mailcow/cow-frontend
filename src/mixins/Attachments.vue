<script>

import EmailService from 'mailcow-services/EmailService';

export default {
  methods: {
    download_attachment (attach) {
      EmailService.download_attachment(attach)
        .then(resp => {
          var blob = new Blob([resp.data]);
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = attach.filename;
          link.click();
        });
    }
  }
};
</script>
