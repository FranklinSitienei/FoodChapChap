class CreateYummypoints < ActiveRecord::Migration[6.1]
  def change
    create_table :yummypoints do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :point

      t.timestamps
    end
  end
end
