Rails.application.config.after_initialize do
  ActionCable.server.config.logger = Logger.new '/dev/null'
end
