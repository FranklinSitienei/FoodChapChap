class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.integer :guests
      t.date :date
      t.time :time
      t.text :instruction

      t.timestamps
    end
  end
end
