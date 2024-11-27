class UsersController < ApplicationController
  before_action :authenticate_user, except: [:index, :create]

  def index
    users = User.all
    render json: users, status: :ok
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: { id: user.id, username: user.username, address: user.address, phone: user.phone, profile_pic: user.profile_pic.url }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def update
    user = current_user
    if user.update(user_params)
      render json: user, status: :ok
    else
      render json: { error: 'Failed to update user.' }, status: :unprocessable_entity
    end
  end

  def fetch_orders
    user = current_user
    orders = user.orders.includes(:orderitems, :restaurant).map do |order|
      {
        id: order.id,
        created_at: order.created_at,
        price: order.price,
        order_type: order.order_type,
        restaurant: {
          name: order.restaurant.brand,
          image: order.restaurant.image
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

  def follow
    user = User.find(params[:id])
    if current_user.follow(user)
      render json: { message: "User followed successfully" }, status: :ok
    else
      render json: { error: "Unable to follow user" }, status: :unprocessable_entity
    end
  end

  def unfollow
    user = User.find(params[:id])
    if current_user.unfollow(user)
      render json: { message: "User unfollowed successfully" }, status: :ok
    else
      render json: { error: "Unable to unfollow user" }, status: :unprocessable_entity
    end
  end

  def my_posts
    user = current_user
    posts = Blog.where(user_id: user.id)
    render json: posts, status: :ok
  end

  def fetch_following_blogs
    blogs = Blog.where(user_id: current_user.following_ids).includes(:user)
    render json: blogs, status: :ok
  end

  def tag_user
    tagged_user = User.find(params[:tagged_user_id])
    post = Post.find(params[:post_id])
    if post.tagged_users << tagged_user
      render json: { message: "User tagged successfully" }, status: :ok
    else
      render json: { error: "Unable to tag user" }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password, :address, :phone, :email, :password_confirmation, :profile_pic)
  end

  def authenticate_user
    unless logged_in?
      render json: { errors: "Unauthorized" }, status: :unauthorized
    end
  end

  def logged_in?
    session[:user_id].present?
  end

  def current_user
    User.find_by(id: session[:user_id])
  end
end
