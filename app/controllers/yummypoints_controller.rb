class YummypointsController < ApplicationController
    # before_action :authenticate_user

    def create
        yummypoint = Yummypoint.create(yummypoint_params)
        if yummypoint.save
            render json: yummypoint, status: :created
        else
            render json: {error: "yummypoint failed to created"}, status: :unprocessable_entity
        end
    end
    def show
        user = User.find(params[:id])
        yummypoint = Yummypoint.find_by(user_id: user.id)
        render json: yummypoint,include:  ['foods.cuisines','foods','orders.orderitems','orders.user', 'orders.orderitems.food'],status: :ok 
        
    end
    def destroy
        yummypoint = Yummypoint.find(params[:id])
        yummypoint.destroy
        head :no_content
              
    end
    private
    def yummypoint_params
        params.permit(:user_id, :point)
    end
        
end
