class ChangeLatCatColumnToLatCab < ActiveRecord::Migration
  def up
    rename_column :trips, :lat_cat, :lat_cab
    rename_column :trips, :lng_cat, :lng_cab
  end

  def down
  end
end
