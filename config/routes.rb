Rails.application.routes.draw do
  resources :riders
  resources :likes
  resources :yummypoints, only: [:create,:index,:show]
  resources :bookings
  resources :blogs do
    resources :comments, only: [:create, :update, :destroy] do
      member do
        post 'like'
      end
      resources :replies, only: [:create, :update, :destroy] do
        member do
          post 'like'
        end
      end
      collection do
        get :fetch_likes_from_followed
      end
    end
  end
  
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
  resources :comments
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
get 'riders/riderorders', to: 'riders#orders_for_rider'
end
