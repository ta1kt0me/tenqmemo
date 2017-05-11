ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/stub_any_instance'
require File.expand_path('test/support/login_helper')
require 'minitest/reporters'

module ActiveSupport
  class TestCase
    include LoginHelper
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    Minitest::Reporters.use!(
      [
        Minitest::Reporters::JUnitReporter.new("tmp/test_reports/minitest"),
        Minitest::Reporters::SpecReporter.new
      ]
    )
  end
end
