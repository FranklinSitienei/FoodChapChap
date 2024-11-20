class SessionsController < ApplicationController
  def user
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { error: 'Unauthorized username and password' }, status: :unprocessable_entity
    end
  end

  def google_login
    credential = params[:credential]
    google_client = JWT.decode(credential, nil, false)
    user_info = google_client[0]["email"]
    user = User.find_by(email: user_info) || User.create(
      username: user_info,
      email: user_info,
      phone: '0794481172',
      address: 'none',
      yummypoints: 0,
      password_digest: '12345678'
    )

    session[:user_id] = user.id

    render json: user.id, status: :created
  end

  def destroy
    session.delete(:user_id)
    render json: { message: 'Successfully logged out' }, status: :ok
  end
end
