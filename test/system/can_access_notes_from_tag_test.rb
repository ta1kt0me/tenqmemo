require 'application_system_test_case'

class CanAccessNotesFromTagTest < ApplicationSystemTestCase
  test 'click a tag link' do
    visit root_path
    click_link 'pop music'
    within '.list-group-item-text' do
      assert_content notes(:one).body
    end
  end
end
