
class OrderSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :quantity, :price, :restaurant_id, :order_type, :created_at
  has_many :orderitems
  belongs_to :user
  belongs_to :restaurant, serializer: RestaurantSerializer

end



