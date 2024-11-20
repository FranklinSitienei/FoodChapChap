class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.integer :user_type
      t.string :username
      t.string :email
      t.string :phone
      t.string :address
      t.integer :yummypoints
      t.string :password_digest
      t.timestamps
    end
  end
end
