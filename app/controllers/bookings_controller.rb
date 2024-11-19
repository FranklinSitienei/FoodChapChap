class BookingsController < ApplicationController
  before_action :authenticate_restaurant, only: [:index, :create, :update, :destroy]
  before_action :authenticate_user, only: [:create]

  # GET /restaurants/:restaurant_id/bookings
  def index
    restaurant = current_restaurant
    bookings = restaurant.bookings
    render json: bookings, include: ['restaurant'], status: :ok
  end

  # GET /bookings (for Admin role)
  def admin_index
    if current_restaurant.admin?
      bookings = Booking.all
      render json: bookings, include: ['restaurant'], status: :ok
    else
      render json: { error: 'Access denied. You are not an admin.' }, status: :forbidden
    end
  end

  # POST /restaurants/:restaurant_id/bookings
  def create
    booking = Booking.new(bookings_params)
    booking.restaurant_id = params[:restaurant_id]

    if booking.save
      render json: booking, status: :created
    else
      render json: { errors: 'Bookings failed to create' }, status: :unprocessable_entity
    end
  end

  # PUT /restaurants/:restaurant_id/bookings/:id
  def update
    booking = Booking.find(params[:id])
    if booking.update(bookings_params)
      render json: booking, status: :ok
    else
      render json: { errors: 'Bookings update failed' }, status: :unprocessable_entity
    end
  end

  # DELETE /restaurants/:restaurant_id/bookings/:id
  def destroy
    booking = Booking.find(params[:id])
    booking.destroy
    head :no_content
  end

  private

  def bookings_params
    params.permit(:firstname, :lastname, :email, :guests, :date, :time, :instruction, :restaurant_id)
  end
end
