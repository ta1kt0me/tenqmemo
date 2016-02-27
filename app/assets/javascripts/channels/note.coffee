App.note = App.cable.subscriptions.create "NoteChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    window.Markdown.refs.preview.update(data['note'])

  preview: (note) ->
    @perform 'preview', note: note
