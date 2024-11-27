class BlogsController < ApplicationController
  before_action :authenticate_user, except: [:index, :show]

  def index
    blogs = Blog.all
    render json: blogs, status: :ok
  end

  def show
    blog = Blog.find(params[:id])
    creator_follows = current_user.following?(blog.user) # Check if the user follows the creator
    likers_follows = blog.likes.exists?(user: current_user) # Check if the user liked the blog

    render json: blog.as_json(include: { 
      comments: { 
        include: :replies 
      } 
    }, methods: [:like_count, :comment_count, :following_creator_or_liker], status: :ok)
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
    if blog.likes.exists?(user: current_user)
      blog.likes.find_by(user: current_user).destroy
      blog.decrement!(:like_count)  # Decrease like count when unliked
      render json: { message: "Blog unliked successfully", like_count: blog.like_count }, status: :ok
    else
      blog.likes.create(user: current_user)
      blog.increment!(:like_count)  # Increase like count when liked
      render json: { message: "Blog liked successfully", like_count: blog.like_count }, status: :ok
    end
  end

  def following_creator_or_liker
    blog = Blog.find(params[:id])
    creator_follows = current_user.following?(blog.user)
    likers_follows = blog.likes.exists?(user: current_user)

    render json: { following_creator: creator_follows, liked_blog: likers_follows }, status: :ok
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
