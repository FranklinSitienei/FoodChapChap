class AddFieldsToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_column :blogs, :like_count, :integer, default: 0
    add_column :blogs, :comment_count, :integer, default: 0
    add_column :blogs, :reply_count, :integer, default: 0
    add_column :blogs, :created_date, :datetime, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
