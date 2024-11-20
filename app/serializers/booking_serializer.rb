class BookingSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname, :email, :guests, :date, :time, :instruction,:restaurant, :user
end
