require './test/test_helper'

class CanAccessHomeTest < Capybara::Rails::TestCase
  test 'title' do
    visit root_path
    assert_content page, 'TENQMEMO'
  end
end
