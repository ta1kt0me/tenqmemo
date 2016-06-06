module LoginHelper
  def sign_in_user(user = users(:user))
    ApplicationController.stub_any_instance(:current_user, user) do
      yield
    end
  end
end
