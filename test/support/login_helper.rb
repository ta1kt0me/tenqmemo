module LoginHelper
  def sign_in_user(user = users(:user))
    ApplicationController.stub_any_instance(:current_user, user) do
      ApplicationCable::Connection.stub_any_instance(:signed_user_id, user.id) do
        yield
      end
    end
  end
end
