class ChangeTodoColType < ActiveRecord::Migration[6.1]
  def change
    change_column :todos, :due, :datetime
  end
end
