class CreateBlogs < ActiveRecord::Migration[6.1]
  def change
    create_table :blogs do |t|
      t.string :title
      t.text :content
      t.string :author
      t.references :user, null: false, foreign_key: true
      t.string :category
      t.string :image_url
      t.integer :likes
      t.integer :dislikes

      t.timestamps
    end
  end
end
