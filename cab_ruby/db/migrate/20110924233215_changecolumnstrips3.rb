class Changecolumnstrips3 < ActiveRecord::Migration
  def up
    rename_column :trips, :departure, :departure_id
    rename_column :trips, :arrival, :arrival_id
  end

  def down
  end
end
