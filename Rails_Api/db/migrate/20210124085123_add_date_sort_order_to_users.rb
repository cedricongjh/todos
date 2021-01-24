class AddDateSortOrderToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :date_sort_ascending, :boolean
  end
end
