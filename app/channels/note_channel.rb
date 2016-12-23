# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
class NoteChannel < ApplicationCable::Channel
  def subscribed
    stream_from "note_channel_user_#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def preview(data)
    PreviewNoteJob.perform_later(data['note'], current_user)
  end
end
