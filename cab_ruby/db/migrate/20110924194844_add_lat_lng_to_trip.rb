class AddLatLngToTrip < ActiveRecord::Migration
  def change
    add_column :trips, :lat_cat, :float
    add_column :trips, :lng_cat, :float
    add_column :trips, :lat_passenger, :float
    add_column :trips, :lng_passenger, :float
  end
end
