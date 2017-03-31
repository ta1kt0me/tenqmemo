require './test/test_helper'

class CanAccessHomeTest < Capybara::Rails::TestCase
  test 'click a tag link' do
    visit root_path
    click_link 'pop music'
    within '.list-group-item-text' do
      assert_content notes(:one).body
      assert_no_text notes(:one).body
    end
  end
end
