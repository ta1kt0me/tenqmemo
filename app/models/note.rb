class Note < ApplicationRecord
  attr_accessor :tag_names

  belongs_to :user
  has_many :note_tags
  has_many :tags, through: :note_tags

  validates :body, presence: true

  before_validation :set_note_tags

  def set_note_tags
    if tag_names.present?
      exist_tags = Tag.where(name: tag_names.uniq)
      new_tags = (tag_names.uniq - (exist_tags.pluck :name)).map do |tag|
        Tag.create(name: tag)
      end

      self.tag_ids = (exist_tags.ids + new_tags.map(&:id)).uniq
    else
      self.note_tags.destroy_all
    end
  end
end
