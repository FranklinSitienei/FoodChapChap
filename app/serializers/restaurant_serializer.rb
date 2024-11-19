class RestaurantSerializer < ActiveModel::Serializer
    attributes :firstname, :lastname, :email, :brand, :location, :phone_number, :image, :permit_file
    belongs_to :user
    has_many :foods
    has_many :orders,  serializer: OrderSerializer
    has_many :orderitems

  end