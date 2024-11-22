class CommentsController < ApplicationController
  before_action :authenticate_user

  def index
    blog = Blog.find(params[:blog_id])
    comments = blog.comments.includes(:user, :likes, :replies) # Preload related data for performance
    render json: comments, include: ['user', 'likes', 'replies']
  end

  def create
    blog = Blog.find(params[:blog_id])
    comment = blog.comments.new(comment_params.merge(user: current_user))

    if comment.save
      blog.increment!(:comment_count)
      render json: comment, status: :created
    else
      render json: { error: "Comment could not be created" }, status: :unprocessable_entity
    end
  end

  def update
    comment = current_user.comments.find(params[:id])

    if comment.update(comment_params)
      render json: comment, status: :ok
    else
      render json: { error: "Comment could not be updated" }, status: :unprocessable_entity
    end
  end

  def destroy
    comment = current_user.comments.find(params[:id])
    blog = comment.blog

    if comment.destroy
      blog.decrement!(:comment_count)
      head :no_content
    else
      render json: { error: "Comment could not be deleted" }, status: :unprocessable_entity
    end
  end
  
  def like
    comment = Comment.find(params[:id])
    if comment.likes.exists?(user: current_user)
      comment.likes.find_by(user: current_user).destroy
      comment.decrement!(:like_count)
      render json: { message: "Comment unliked successfully" }, status: :ok
    else
      comment.likes.create(user: current_user)
      comment.increment!(:like_count)
      render json: { message: "Comment liked successfully" }, status: :ok
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end

