class RestaurantsController < ApplicationController
  before_action :authenticate_restaurant, except: [:signup, :login, :index]
  before_action :set_restaurant, only: [:show, :edit, :update, :orders_for_restaurant, :approve_dining_order]

  def index
    @restaurants = Restaurant.all.map { |restaurant| restaurant.slice(:id, :firstname, :lastname, :email, :brand, :location, :phone_number, :image) }
    render json: @restaurants
  end

  def signup
    unless restaurant_params[:permit_file].present?
      return render json: { error: 'Business permit file is required' }, status: :unprocessable_entity
    end

    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.password = params[:password]

    if @restaurant.save
      render json: { restaurant: @restaurant.slice(:id, :firstname, :lastname, :email, :brand, :location, :phone_number) }, status: :created
    else
      render json: { error: @restaurant.errors.full_messages.join("Sorry You Cant Signup Right Now. Try Again!") }, status: :unprocessable_entity
    end
  end

  def login
    restaurant = Restaurant.find_by(email: params[:email])
    if restaurant && restaurant.authenticate(params[:password])
      token = encode_token({ restaurant_id: restaurant.id })
      render json: { token: token, restaurant: restaurant.slice(:id, :firstname, :lastname, :email, :brand, :location, :phone_number) }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def update
    if @restaurant.update(restaurant_params)
      render json: @restaurant, status: :ok
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
  end

  def show
    orders = Order.where(restaurant_id: @restaurant.id).includes(:user, orderitems: :food)
    orders_with_details = orders.map do |order|
      {
        order_id: order.id,
        order_price: order.price,
        order_quantity: order.quantity,
        order_type: order.order_type,
        order_status: order.status,
        order_date: order.created_at,
        user: {
          username: order.user.username,
          location: order.user.address,
          phone_number: order.user.phone
        },
        foods: order.orderitems.map do |orderitem|
          {
            food_id: orderitem.food.id,
            food_name: orderitem.food.name,
            food_image: orderitem.food.image
          }
        end
      }
    end

    foods = Food.where(restaurant_id: @restaurant.id).includes(:cuisine)
    render json: { restaurant: @restaurant.as_json(only: [:id, :firstname, :lastname, :email, :brand, :location, :phone_number]), orders: orders_with_details, foods: foods }, status: :ok
  end

  def approve_dining_order
    order = Order.find(params[:order_id])
    if order.order_type == 'dining' && order.status == 'created'
      order.update(status: 'received')
      render json: { message: 'Order approved for dining' }, status: :ok
    else
      render json: { error: 'Unable to approve order' }, status: :unprocessable_entity
    end
  end

  def orders_for_restaurant
    @orders = @restaurant.orders.includes(:user)
    render json: @orders
  end

  def me
    restaurant = current_restaurant
    if restaurant
      render json: restaurant.slice(:id, :firstname, :lastname, :email, :brand, :location, :phone_number), status: :ok
    else
      render json: { error: 'Restaurant not found' }, status: :not_found
    end
  end

  def fetch_delivered_orders
    delivered_orders = @restaurant.orders.where(status: 'delivered').includes(:user)
    orders_with_details = delivered_orders.map do |order|
      {
        order_id: order.id,
        order_price: order.price,
        order_quantity: order.quantity,
        user: {
          username: order.user.username,
          location: order.user.address,
          phone_number: order.user.phone
        },
        foods: order.orderitems.map do |orderitem|
          {
            food_id: orderitem.food.id,
            food_name: orderitem.food.name,
            food_image: orderitem.food.image
          }
        end
      }
    end

    render json: { delivered_orders: orders_with_details }, status: :ok
  end

  private

  def restaurant_params
    params.permit(:firstname, :lastname, :email, :brand, :location, :phone_number, :image, :permit_file, :password, :password_confirmation)
  end

  def set_restaurant
    @restaurant = current_restaurant
  end
end
