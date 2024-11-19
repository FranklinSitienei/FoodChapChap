class BlogsController < ApplicationController
  before_action :authenticate_user, except: [:index, :show]

  def index
    blogs = Blog.all
    render json: blogs, status: :ok
  end

  def show
    blog = Blog.find(params[:id])
    render json: blog.as_json(include: { comments: { include: :replies } }), status: :ok
  end

  def create
    blog = current_user.blogs.create(blog_params)

    if blog.save
      render json: blog, status: :created
    else
      render json: { error: "Blog could not be created" }, status: :unprocessable_entity
    end
  end

  def update
    blog = current_user.blogs.find(params[:id])
    if blog.update(blog_params)
      render json: blog, status: :ok
    else
      render json: { error: "Blog could not be updated" }, status: :unprocessable_entity
    end
  end

  def destroy
    blog = current_user.blogs.find(params[:id])
    blog.destroy
    head :no_content
  end

  def like
    blog = Blog.find(params[:id])
    like = blog.likes.create(user: current_user)
    if like.save
      render json: { message: "Blog liked successfully" }, status: :ok
    else
      render json: { error: "Unable to like blog" }, status: :unprocessable_entity
    end
  end

  def fetch_likes_from_followed
    blogs = Blog.joins(:likes).where(likes: { user_id: current_user.following_ids })
    render json: blogs, status: :ok
  end

  private

  def authenticate_user
    unless logged_in?
      render json: { error: "User not logged in" }, status: :unauthorized
    end
  end

  def logged_in?
    session[:user_id].present?
  end

  def current_user
    User.find_by(id: session[:user_id])
  end

  def blog_params
    params.permit(:title, :content, :author, :category, :image_url, :likes, :dislikes)
  end
end
