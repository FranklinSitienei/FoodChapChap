class CuisineSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :foods
end
