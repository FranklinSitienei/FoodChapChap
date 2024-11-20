class RepliesController < ApplicationController
    before_action :authenticate_user
  
    def create
      comment = Comment.find(params[:comment_id])
      reply = comment.replies.new(reply_params.merge(user: current_user))
  
      if reply.save
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
      reply.destroy
      head :no_content
    end
  
    def like
      reply = Reply.find(params[:id])
      reply.increment!(:likes)
      render json: reply, status: :ok
    end
  
    private
  
    def reply_params
      params.require(:reply).permit(:content)
    end
  end