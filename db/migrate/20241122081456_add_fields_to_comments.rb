class AddFieldsToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :like_count, :integer, default: 0
    add_column :comments, :reply_count, :integer, default: 0
    add_column :comments, :created_date, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
