<script>
export default {
  data: () => ({
    default_folders: {
      inbox: { icon: 'inbox', 'name': 'inbox', 'index': 0 },
      sent: { icon: 'send', 'name': 'sent', 'index': 1 },
      starred: { icon: 'star', 'name': 'starred', 'index': 2 },
      trash: { icon: 'delete', 'name': 'trash', 'index': 3 },
      archive: { icon: 'file', 'name': 'archive', 'index': 4 },
      drafts: { icon: 'email-open', 'name': 'drafts', 'index': 5 },
      spam: { icon: 'alert-circle', 'name': 'spam', 'index': 6 }
    }
  }),
  computed: {
    folders () {
      var folders = {default: [], other: []};
      this.$store.getters.get_folders.forEach((f) => {
        if (f.name && this.default_folders[f.name]) {
          var d_f = this.default_folders[f.name];
          folders.default.push({...d_f, ...f});
        } else {
          folders.other.push(f);
        }
      });
      folders.default.sort(function(a, b) {
          return a.index - b.index;
      });
      return folders;
    }
  }
}
</script>
