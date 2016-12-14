class CreateNoteTags < ActiveRecord::Migration[5.0]
  def change
    create_table :note_tags do |t|
      t.references :note, foreign_key: true, null: false
      t.references :tag, foreign_key: true, null: false

      t.timestamps
    end

    add_index :note_tags, [:note_id, :tag_id], unique: true
  end
end
