class NoteTag < ApplicationRecord
  belongs_to :note
  belongs_to :tag

  validates :note, :tag, presence: true
  validates :tag, uniqueness: { scope: :note }
end
