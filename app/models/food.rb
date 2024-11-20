class Food < ApplicationRecord
      belongs_to :restaurant
      belongs_to :cuisine
      has_many :orderitems

    
  end
  
