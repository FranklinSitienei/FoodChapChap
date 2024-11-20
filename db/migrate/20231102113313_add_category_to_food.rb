class AddCategoryToFood < ActiveRecord::Migration[6.1]
  def change
    add_column :foods, :category, :string
  end
end
