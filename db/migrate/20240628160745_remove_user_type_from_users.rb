class RemoveUserTypeFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :user_type, :integer
  end
end
