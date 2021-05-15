class RenameArrayIdToPriority < ActiveRecord::Migration[6.1]
  def change
    rename_column :todos, :array_id, :priority
  end
end
