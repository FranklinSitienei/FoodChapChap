class CreateRiders < ActiveRecord::Migration[6.1]
  def change
    create_table :riders do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, unique: true
      t.string :phone_number
      t.string :password_digest
      t.timestamps
    end
  end
end