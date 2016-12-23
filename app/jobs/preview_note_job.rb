class PreviewNoteJob < ApplicationJob
  queue_as :default

  def perform(note, current_user)
    ActionCable.server.broadcast "note_channel_user_#{current_user.id}", note: render_note(note)
  end

  private

  def render_note(note)
    ApplicationController.renderer.render partial: 'notes/note', locals: { note: note }
  end
end
