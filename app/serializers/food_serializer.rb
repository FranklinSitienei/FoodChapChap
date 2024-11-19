
class FoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :quantity, :image, :foodtype, :discount_price, :category 
  has_many :orderitems
  belongs_to :cuisine, serializer: CuisineSerializer
  belongs_to :restaurant, serializer: RestaurantSerializer
end

