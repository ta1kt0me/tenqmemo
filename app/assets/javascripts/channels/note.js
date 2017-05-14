(function() {
  App.note = App.cable.subscriptions.create("NoteChannel", {
    connected: function() {},
    disconnected: function() {},
    received: function(data) {
      return window.Markdown.update(data['note']);
    },
    preview: function(note) {
      return this.perform('preview', {note: note});
    }
  });
}).call(this);
