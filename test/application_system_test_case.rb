require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  Capybara.javascript_driver = :selenium
  driven_by(
    :selenium,
    using: :chrome,
    screen_size: [1400, 900],
    options: {
      desired_capabilities: {
        chromeOptions: {
          args: %w[headless disable-gpu]
        }
      }
    }
  )
end
