module SessionsHelper
  def log_in(user)
    session[:current_user] = user
  end
end
