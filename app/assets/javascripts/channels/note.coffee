App.note = App.cable.subscriptions.create "NoteChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $('.preview').html(data['note'])

  preview: (note) ->
    @perform 'preview', note: note

  $(document).on 'keypress', '[data-behavior~=writer]', (event) ->
    App.note.preview event.target.value if event.type is 'keypress'
