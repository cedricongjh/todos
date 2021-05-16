class AddUserIdToPriorities < ActiveRecord::Migration[6.1]
  def change
    add_column :priorities, :user_id, :integer
  end
end
