class ChangeCategoryToBeNumberInTodo < ActiveRecord::Migration[6.1]
  def up
    change_column :todos, :category, :integer
  end

  def down
    change_column :todos, :category, :string
  end
end
