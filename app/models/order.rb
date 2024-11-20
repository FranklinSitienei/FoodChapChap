class Order < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :restaurant
  has_many :orderitems
  has_many :foods, through: :orderitems
  belongs_to :rider, optional: true

  # Define statuses
  enum status: { created: 'created', confirmed: 'confirmed', pending: 'pending', delivering: 'delivering', delivered: 'delivered', canceled: 'canceled' }
  
end
