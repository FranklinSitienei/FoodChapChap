class CreateFoods < ActiveRecord::Migration[6.1]
  def change
    create_table :foods do |t|
      t.string :name
      t.integer :quantity
      t.text :description
      t.integer :price
      t.integer :foodtype
      t.integer :restaurant_id
      t.integer :cuisine_id
      t.string :image, default: 'one.jpg'
      t.timestamps
    end
  end
end
