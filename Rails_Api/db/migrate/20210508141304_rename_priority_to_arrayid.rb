class RenamePriorityToArrayid < ActiveRecord::Migration[6.1]
  def change
    rename_column :todos, :priority, :array_id
  end
end
