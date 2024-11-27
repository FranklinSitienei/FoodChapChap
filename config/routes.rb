Rails.application.routes.draw do
  resources :riders
  resources :likes
  resources :yummypoints, only: [:create,:index,:show]
  resources :bookings

  # Blog Routes
  get '/blogs', to: 'blogs#index'           # List all blogs
  get '/blogs/:id', to: 'blogs#show', as: 'blog'  # View a specific blog
  post '/blog/create', to: 'blogs#create'         # Create a new blog
  patch '/blogs/:id/update', to: 'blogs#update'    # Update a specific blog
  delete '/blogs/:id/delete', to: 'blogs#destroy'  # Delete a specific blog
  post '/blogs/:id/like', to: 'blogs#like'  # Like/unlike a blog
  get '/blogs/likes/followed', to: 'blogs#following_creator_or_liker' # Fetch likes from followed users

  # Comment Routes
  get '/blogs/:blog_id/comments', to: 'comments#index'                  # All comment on a eachblog
  post '/blogs/:blog_id/comments/create', to: 'comments#create'         # Create a comment on a blog
  patch '/blogs/:blog_id/comments/:id/update', to: 'comments#update'    # Update a specific comment
  delete '/blogs/:blog_id/comments/:id/delete', to: 'comments#destroy'  # Delete a specific comment
  post '/blogs/:blog_id/comments/:id/like', to: 'comments#like'  # Like/unlike a comment

  # Reply Routes
  get '/blogs/:blog_id/comments/:comment_id/replies', to: 'replies#index'         # Create a reply to a comment
  post '/blogs/:blog_id/comments/:comment_id/replies/create', to: 'replies#create'         # Create a reply to a comment
  patch '/blogs/:blog_id/comments/:comment_id/replies/:id/update', to: 'replies#update'    # Update a specific reply
  delete '/blogs/:blog_id/comments/:comment_id/replies/:id/delete', to: 'replies#destroy'  # Delete a specific reply
  post '/blogs/:blog_id/comments/:comment_id/replies/:id/like', to: 'replies#like'  # Like/unlike a reply
  
  resources :cuisines
  resources :restaurants, only: [:update]
  
  # Signup and login routes
  post '/restaurant/signup', to: 'restaurants#signup'
  post '/restaurant/login', to: 'restaurants#login'
  get '/restaurants/orders', to: 'restaurants#show'
  get '/restaurants/me', to: 'restaurants#me'
  get 'restaurants/delivered', to: 'restaurants#fetch_delivered_orders'
  get '/restaurants', to: 'restaurants#index'
  

  resources :foods, only: [:index, :create, :update, :destroy]
  get 'restaurants/:id/foods', to: 'foods#restaurant_foods'
  resources :orderitems
  resources :orders do
    collection do
      get 'deliverorders'
    end
  end
  patch '/users/confirmdelivery', to: 'orders#confirm_delivery'
  get '/riders/orders', to: 'orders#fetch_delivery_orders'
 
  resources :reviews
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html



  resources :bookings, only: [:index, :create, :update, :destroy], controller: 'bookings'


  # Define an additional route for admin bookings
  get '/admin/bookings', to: 'bookings#admin_index'

  resources :users do
    member do
      get :fetch_orders
      post :follow
      delete :unfollow
      get :fetch_following_blogs
      get :my_posts
    end
    collection do
      post :tag_user
    end
  end

  resources :relationships, only: [:create, :destroy]

  
resources :users, only: [:index]
post '/google_login', to: 'sessions#google_login'
post "/signup", to: 'users#create'

post "/riders/signup", to: 'riders#create'
# post "/reviews", to: 'reviews#create'
get "/me", to:'users#show'
get '/user/orders', to: 'users#fetch_orders'

get "/riderme", to:'riders#show'
post '/orders/:id/confirm', to:"orders#confirm"
     
post '/orders/:id/cancel', to:"orders#cancel"
post '/orders/:id/confirm_delivery', to: 'riders#confirm_delivery'
get '/riders/deliveries', to: 'riders#show'

# get "/ordersuser/:id", to: 'orders#showuser'
put 'users/:id', to: 'users#update'
get "/reviewsuser/:id", to: 'reviews#showreviews'

post "/login", to: 'sessions#user'
post '/riders/login', to: 'riders#login'
delete '/logout', to:'sessions#destroy'
patch '/reset', to:'users#reset'
get '/riders/riderorders', to: 'riders#orders_for_rider'
end
