class AddDiscountPriceToFoods < ActiveRecord::Migration[6.1]
  def change
    add_column :foods, :discount_price, :integer
  end
end
