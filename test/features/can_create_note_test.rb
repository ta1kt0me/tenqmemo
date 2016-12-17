require 'test_helper'

class CanCreateNoteTest < Capybara::Rails::TestCase
  def setup
    Capybara.current_driver = Capybara.javascript_driver
    super
  end

  def teardown
    super
    Capybara.use_default_driver
  end

  test 'create note' do
    body = 'new note'

    sign_in_user do
      visit new_note_path
      find('.tag-input-field').set('mytag')
      find('.tag-input-field').native.send_keys(:return)
      fill_in 'note_body', with: body

      within '.preview' do
        assert_content page, body
      end

      click_button 'Save'

      assert_content page, body
      assert_content page, 'mytag'
    end
  end
end
