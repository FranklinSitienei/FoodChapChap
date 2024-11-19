class AddLocationToRiders < ActiveRecord::Migration[6.1]
  def change
    add_column :riders, :location, :string
  end
end
