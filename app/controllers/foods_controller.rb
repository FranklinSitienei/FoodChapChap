class FoodsController < ApplicationController
  before_action :authenticate_restaurant, only: [:create, :update, :destroy]
  before_action :authenticate_user, only: [:index, :restaurant_foods]

  def index
    @foods = Food.all
    render json: @foods
  end

  def restaurant_foods
    if logged_in_user? || logged_in_restaurant?
      restaurant_id = params[:id]
      foods = Food.where(restaurant_id: restaurant_id).includes(:cuisine, :restaurant)
      render json: foods, include: ['cuisine', 'restaurant']
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def create
    food = current_restaurant.foods.new(food_params)
    if food.save
      render json: food, status: :created
    else
      render json: { errors: food.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @food = Food.find(params[:id])
    if @food.update(food_params)
      render json: @food, status: :ok
    else
      render json: { error: 'Failed to update food.' }, status: :unprocessable_entity
    end
  end

  def destroy
    food = Food.find(params[:id])
    food.destroy
    head :no_content
  end

  private

  def food_params
    params.require(:food).permit(:name, :quantity, :discount_price, :description, :price, :foodtype, :cuisine_id, :image)
  end
end
