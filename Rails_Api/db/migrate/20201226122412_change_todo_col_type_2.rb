class ChangeTodoColType2 < ActiveRecord::Migration[6.1]
  def change
    change_column :todos, :due, :date
  end
end
