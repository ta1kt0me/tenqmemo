ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/stub_any_instance'
require File.expand_path('test/support/login_helper')
require 'minitest/rails/capybara'
require 'capybara/poltergeist'
require 'minitest/reporters'

module ActiveSupport
  class TestCase
    include LoginHelper
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    Capybara.javascript_driver = :poltergeist
    Capybara.register_server :puma do |app, port, host|
      require 'rack/handler/puma'
      Rack::Handler::Puma.run(app, Host: host, Port: port, Threads: "0:4", Silent: true)
    end
    Capybara.server = :puma

    Minitest::Reporters.use!(
      [
        Minitest::Reporters::JUnitReporter.new("tmp/test_reports/minitest"),
        Minitest::Reporters::SpecReporter.new
      ]
    )
  end
end
