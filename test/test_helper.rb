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

    reports_path = ENV['CI'].nil? ? "tmp/test_reports" : "#{ENV['CIRCLE_TEST_REPORTS']}/test_reports"

    Minitest::Reporters.use!(
      [
        Minitest::Reporters::JUnitReporter.new(reports_path, false),
        Minitest::Reporters::SpecReporter.new
      ]
    )
  end
end
