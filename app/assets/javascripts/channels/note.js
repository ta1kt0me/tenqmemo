(function () {
  App.note = App.cable.subscriptions.create('NoteChannel', {
    connected() {},
    disconnected() {},
    received(data) {
      return window.Markdown.update(data.note);
    },
    preview(note) {
      return this.perform('preview', { note });
    },
  });
}).call(this);
