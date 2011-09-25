class Changecolumnstrips2 < ActiveRecord::Migration
  def up
    remove_column(:trips, [:start_latitude,:start_longitude,:end_latitude,:end_longitude])
    remove_column(:trips, :departure)
    remove_column(:trips, :arrival)
    add_column(:trips, :departure, :integer)
    add_column(:trips, :arrival, :integer)
  end

  def down
  end
end
