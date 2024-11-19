class CreateRestaurants < ActiveRecord::Migration[6.1]
  def change
    create_table :restaurants do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :brand
      t.string :location
      t.string :phone_number
      t.string :image
      t.string :permit_file

      t.timestamps
    end
  end
end
