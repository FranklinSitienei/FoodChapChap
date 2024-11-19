class BlogSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :author, :category, :image_url, :likes, :dislikes
  has_one :user
end
