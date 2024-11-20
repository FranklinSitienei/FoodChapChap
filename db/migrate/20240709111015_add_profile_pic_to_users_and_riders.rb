class AddProfilePicToUsersAndRiders < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :profile_pic, :string
    add_column :riders, :profile_pic, :string
  end
end
