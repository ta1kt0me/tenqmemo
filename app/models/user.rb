class User < ApplicationRecord
  validates_presence_of :username, :email, :password
  validates_uniqueness_of :username, :email
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :password, length: { minimum: 12 }

  has_secure_password
end
