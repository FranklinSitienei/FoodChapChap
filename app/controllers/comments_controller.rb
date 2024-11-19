class CommentsController < ApplicationController
  before_action :authenticate_user

  def create
    blog = Blog.find(params[:blog_id])
    comment = blog.comments.new(comment_params.merge(user: current_user))

    if comment.save
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
    comment.destroy
    head :no_content
  end

  def like
    comment = Comment.find(params[:id])
    comment.increment!(:likes)
    render json: comment, status: :ok
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end

