class OrderitemsController < ApplicationController
  before_action :authenticate_user
    def create
        order_items = params[:order_items]
        
        # Loop through the order items and create them individually
        order_items.each do |order_item_params|
          Orderitem.create(order_item_params.permit(:order_id, :food_id, :quantity, :price))
        end
        
        # Respond with a success message or appropriate JSON response
        render json: { message: 'Order items created successfully' }
      end

      private

      
    def logged_in_restaurant?
      current_restaurant.present?
    end
  
    def authenticate_restaurant
      unless logged_in_restaurant?
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
end
