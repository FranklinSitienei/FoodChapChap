class AddBikeTypeToRiders < ActiveRecord::Migration[6.1]
  def change
    add_column :riders, :bike_type, :string
  end
end
