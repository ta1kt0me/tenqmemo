# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      if current_user = User.find_by(id: signed_user_id)
        current_user
      else
        reject_unauthorized_connection
      end
    end

    def signed_user_id
      cookies.signed[:user_id]
    end
  end
end
