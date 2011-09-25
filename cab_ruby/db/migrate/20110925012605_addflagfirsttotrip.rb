class Addflagfirsttotrip < ActiveRecord::Migration
  def up
    add_column :trips, :flag_first_cab, :boolean
    add_column :trips, :flag_first_passenger, :boolean
  end

  def down
  end
end
