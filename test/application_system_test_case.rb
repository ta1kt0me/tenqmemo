require 'test_helper'
require 'capybara/poltergeist'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  Capybara.javascript_driver = :poltergeist
  driven_by :poltergeist
end
