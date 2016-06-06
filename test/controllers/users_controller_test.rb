require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test 'should get new' do
    get user_new_url
    assert_response :success
  end
end
