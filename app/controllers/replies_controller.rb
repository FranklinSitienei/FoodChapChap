class RepliesController < ApplicationController
    before_action :authenticate_user

    def index
      comment = Comment.find(params[:comment_id])
      replies = comment.replies.includes(:user, :likes) # Preload related data for performance
      render json: replies, include: ['user', 'likes']
    end
  
    def create
      comment = Comment.find(params[:comment_id])
      reply = comment.replies.new(reply_params.merge(user: current_user))
  
      if reply.save
        comment.increment!(:reply_count)
        render json: reply, status: :created
      else
        render json: { error: "Reply could not be created" }, status: :unprocessable_entity
      end
    end
  
    def update
      reply = current_user.replies.find(params[:id])
  
      if reply.update(reply_params)
        render json: reply, status: :ok
      else
        render json: { error: "Reply could not be updated" }, status: :unprocessable_entity
      end
    end
  
    def destroy
      reply = current_user.replies.find(params[:id])
      comment = reply.comment
  
      if reply.destroy
        comment.decrement!(:reply_count)
        head :no_content
      else
        render json: { error: "Reply could not be deleted" }, status: :unprocessable_entity
      end
    end
  
    def like
      reply = Reply.find(params[:id])
      if reply.likes.exists?(user: current_user)
        reply.likes.find_by(user: current_user).destroy
        reply.decrement!(:like_count)
        render json: { message: "Reply unliked successfully" }, status: :ok
      else
        reply.likes.create(user: current_user)
        reply.increment!(:like_count)
        render json: { message: "Reply liked successfully" }, status: :ok
      end
    end
  
    private
  
    def reply_params
      params.require(:reply).permit(:content)
    end
  end