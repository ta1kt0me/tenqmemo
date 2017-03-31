namespace :test_queue do
  desc "setup database for test_queue"
  task setup: :environment do
    db_name = ActiveRecord::Base.configurations['test']['database']
    ActiveRecord::Base.configurations['test']['database']
    ActiveRecord::Base.establish_connection(:test)
    ActiveRecord::Tasks::DatabaseTasks.drop_current
    ActiveRecord::Tasks::DatabaseTasks.create_current
    ActiveRecord::Tasks::DatabaseTasks.load_schema_current

    (1..ENV['TEST_QUEUE_WORKERS'].to_i).each do |num|
      ActiveRecord::Base.configurations['test']['database'] = db_name + num.to_s
      ActiveRecord::Base.establish_connection(:test)
      ActiveRecord::Tasks::DatabaseTasks.drop_current
      ActiveRecord::Tasks::DatabaseTasks.create_current
      ActiveRecord::Tasks::DatabaseTasks.load_schema_current
    end
  end
end
