# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.find_or_initialize_by({ username: 'foo', email: 'foo@example.com',  }) do |u|
  u.password = 'test'*3
  u.password_confirmation = 'test'*3
end

data = Array.new(300) { |i| { body: ('A'..'z').to_a.join, user_id: user.id } }
Note.create data
