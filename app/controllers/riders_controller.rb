class RidersController < ApplicationController
  before_action :authenticate_rider, except: [:login, :create]

  def index
    riders = Rider.all
    render json: riders, status: :ok
  end

  def create
    rider = Rider.create(rider_params)
    if rider.valid?
      token = encode_token({ rider_id: rider.id })
      render json: { token: token, rider: rider.slice(:id, :first_name, :last_name, :phone_number, :email, :location, :bike_type, :profile_pic) }, status: :created
    else
      render json: { error: rider.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    rider = Rider.find_by(email: params[:email])
    if rider && rider.authenticate(params[:password])
      token = encode_token({ rider_id: rider.id })
      render json: { token: token, rider: rider.slice(:id, :first_name, :last_name, :phone_number, :email, :location, :bike_type, :profile_pic) }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end  

  def show
    rider = current_rider
    orders = Order.where(order_type: 'delivery').includes(:user, :restaurant)

    orders_in_location = orders.select { |order| order_in_same_location?(order, rider) }

    orders_with_user_details = orders_in_location.map do |order|
      {
        order_id: order.id,
        order_price: order.price,
        order_quantity: order.quantity,
        user: {
          username: order.user.username,
          location: order.user.address,
          phone_number: order.user.phone
        },
        restaurant: {
          name: order.restaurant.brand
        }
      }
    end

    render json: { rider: rider.as_json(only: [:id, :first_name, :last_name, :email, :phone_number, :location, :bike_type, :profile_pic]), orders: orders_with_user_details }, status: :ok
  end

  def update
    if current_rider.update(rider_params)
      render json: current_rider, status: :ok
    else
      render json: { error: 'Failed to update rider.' }, status: :unprocessable_entity
    end
  end

  def orders_for_rider
    orders = Order.where(order_type: 'delivery').includes(:user, :restaurant)
    orders_with_user_details = orders.map do |order|
      {
        order_id: order.id,
        order_price: order.price,
        order_quantity: order.quantity,
        user: {
          username: order.user.username,
          location: order.user.address,
          phone_number: order.user.phone
        },
        restaurant: {
          name: order.restaurant.brand
        }
      }
    end
    render json: orders_with_user_details, status: :ok
  end

  def confirm_delivery
    order = Order.find(params[:id])
    if order.order_type == 'delivery'
      order.update(status: :delivering)
      render json: { message: 'Order is now being delivered' }, status: :ok
    else
      render json: { error: 'Unable to confirm delivery' }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end

  private

  def rider_params
    params.permit(:first_name, :last_name, :phone_number, :email, :password, :location, :bike_type, :profile_pic)
  end

  def order_in_same_location?(order, rider)
    order.user.address == rider.location
  end
end
