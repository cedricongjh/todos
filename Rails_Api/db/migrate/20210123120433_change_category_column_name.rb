class ChangeCategoryColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :todos, :category, :category_id
  end
end
