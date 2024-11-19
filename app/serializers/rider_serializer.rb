class RiderSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone_number, :bike_type, :experience_level, :availability

  has_many :orders
end