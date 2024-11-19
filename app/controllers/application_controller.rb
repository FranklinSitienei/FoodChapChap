class ApplicationController < ActionController::API
  include ActionController::Cookies

  protected

  def authenticate_user
    unless logged_in_user?
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
  
  def authenticate_rider
    unless logged_in_rider?
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def authenticate_restaurant
    unless logged_in_restaurant?
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def current_rider
    if decoded_token
      rider_id = decoded_token[0]['rider_id']
      @current_rider ||= Rider.find_by(id: rider_id)
    end
  end

  def current_restaurant
    if decoded_token
      restaurant_id = decoded_token[0]['restaurant_id']
      @current_restaurant ||= Restaurant.find_by(id: restaurant_id)
    end
  end

  def logged_in_user?
    current_user.present?
  end

  def logged_in_rider?
    current_rider.present?
  end

  def logged_in_restaurant?
    current_restaurant.present?
  end

  private

  def encode_token(payload)
    JWT.encode(payload, 'your_secret_key')
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'your_secret_key', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end
end
