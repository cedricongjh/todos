class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :text
      t.integer :category
      t.date :due
      t.boolean :completed

      t.timestamps
    end
  end
end
