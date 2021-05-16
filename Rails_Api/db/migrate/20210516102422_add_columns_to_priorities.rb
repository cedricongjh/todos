class AddColumnsToPriorities < ActiveRecord::Migration[6.1]
  def change
    add_column :priorities, :level, :integer
    add_column :priorities, :color, :string
  end
end
