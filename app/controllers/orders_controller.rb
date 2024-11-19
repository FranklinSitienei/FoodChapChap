class OrdersController < ApplicationController
  before_action :authenticate_user, except: [:fetch_delivery_orders, :fetch_orders_for_restaurant]
  before_action :authenticate_rider, only: [:fetch_delivery_orders, :confirm_delivery]
  before_action :authenticate_restaurant, except: [:confirm, :cancel, :fetch_delivery_orders, :create]

  def create
    order = Order.new(order_params)
    order.status = 'created'
    order.created_at = Time.now
    if order.save
      if order.price > 500
        points = order.price / 500
        user = User.find(order.user_id)
        user.update(yummypoints: user.yummypoints.to_i + points.to_i)
      end
      render json: order, status: :created
    else
      render json: order.errors, status: :unprocessable_entity
    end
  end

  def confirm
    order = Order.find(params[:id])
    if order.user_id == current_user.id && order.status == 'created'
      if order_within_confirmation_time?(order)
        order.update(status: 'confirmed')
        render json: { message: 'Order confirmed' }, status: :ok
      else
        order.update(status: 'canceled')
        render json: { error: 'Order has expired and was canceled' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Unable to confirm order' }, status: :unprocessable_entity
    end
  end

  def cancel
    order = Order.find(params[:id])
    if order.user_id == current_user.id && (order.status == 'created' || order.status == 'confirmed')
      order.update(status: 'canceled')
      render json: { message: 'Order canceled' }, status: :ok
      
      # Schedule self-deletion in 5 minutes
      Thread.new do
        sleep 5.minutes
        # Re-fetch the order to ensure it hasn't been modified since the cancellation
        order.reload
        order.destroy if order.status == 'canceled'
      end
    else
      render json: { error: 'Unable to cancel order' }, status: :unprocessable_entity
    end
  end

  def fetch_orders_for_restaurant
    restaurant = Restaurant.find(params[:restaurant_id])
    orders = restaurant.orders.includes(:user, :orderitems).map do |order|
      {
        id: order.id,
        created_at: order.created_at,
        price: order.price,
        status: order.status,
        order_type: order.order_type,
        user: {
          username: order.user.username,
          phone: order.user.phone,
          address: order.user.address
        },
        orderitems: order.orderitems.map do |item|
          {
            id: item.id,
            food: {
              name: item.food.name,
              description: item.food.description
            },
            price: item.price
          }
        end
      }
    end
    render json: orders, status: :ok
  end

  def confirm_delivery
    order = Order.find(params[:id])
    if order.order_type == 'delivery' && order.status == 'confirmed'
      order.update(status: 'delivering')
      render json: { message: 'Order is now being delivered' }, status: :ok
    else
      render json: { error: 'Unable to confirm delivery' }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Order not found' }, status: :not_found
  end

  def fetch_delivery_orders
    orders = Order.where(order_type: 'delivery').includes(:user, :restaurant)
    orders_with_details = orders.map do |order|
      {
        id: order.id,
        created_at: order.created_at,
        price: order.price,
        status: order.status,
        user: {
          username: order.user.username,
          phone: order.user.phone,
          address: order.user.address
        },
        restaurant: {
          name: order.restaurant.name
        }
      }
    end
    render json: orders_with_details, status: :ok
  end

  private

  def order_params
    params.require(:order).permit(:user_id, :quantity, :price, :restaurant_id, :order_type)
  end

  def logged_in_restaurant?
    current_restaurant.present?
  end

  def authenticate_restaurant
    unless logged_in_restaurant?
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def authenticate_user
    unless logged_in?
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def logged_in?
    current_user.present?
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def order_within_confirmation_time?(order)
    Time.now <= order.created_at + 10.minutes
  end
end
