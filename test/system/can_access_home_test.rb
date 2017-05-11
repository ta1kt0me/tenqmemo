require 'application_system_test_case'

class CanAccessHomeTest < ApplicationSystemTestCase
  test 'title' do
    visit root_path
    assert_content page, 'TENQMEMO'
  end
end
