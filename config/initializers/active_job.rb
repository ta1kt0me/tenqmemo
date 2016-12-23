Rails.application.config.after_initialize do
  ActiveJob::Base.logger = Logger.new '/dev/null'
end
