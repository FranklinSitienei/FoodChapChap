class ReviewsController < ApplicationController
  before_action :authenticate_user, only: [:create, :showreviews]
  before_action :authenticate_restaurant, only: [:reply]

  def index
    reviews = Review.all
    render json: reviews
  end

  def create
    review = Review.new(review_params)
    review.user_id = current_user.id

    if review.save
      render json: review, status: :created
    else
      render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    reviews = Review.where(restaurant_id: params[:restaurant_id])
    render json: reviews, include: ['user']
  end

  def update
    review = find_review
    if review
      if review.user_id == current_user.id
        review.update(review_update_params)
        render json: review
      else
        render json: { error: "Unauthorized action" }, status: :forbidden
      end
    else
      render json: { error: "Review not found" }, status: :not_found
    end
  end

  def destroy
    review = find_review
    if review.user_id == current_user.id
      review.destroy
      head :no_content
    else
      render json: { error: "Unauthorized action" }, status: :forbidden
    end
  end

  def showreviews
    user = User.find(params[:id])
    reviews = Review.where(user_id: user.id)
    render json: reviews, include: ['restaurant']
  end

  def reply
    review = Review.find(params[:id])
    if review
      review.update(reply_params)
      render json: review, status: :ok
    else
      render json: { error: "Review not found" }, status: :not_found
    end
  end

  private

  def find_review
    Review.find(params[:id])
  end

  def review_params
    params.permit(:restaurant_id, :review, :rate)
  end

  def review_update_params
    params.permit(:review, :rate)
  end

  def reply_params
    params.permit(:reply)
  end
end
