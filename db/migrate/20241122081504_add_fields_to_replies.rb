class AddFieldsToReplies < ActiveRecord::Migration[6.1]
  def change
    add_column :replies, :like_count, :integer, default: 0
    add_column :replies, :created_date, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
