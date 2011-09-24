class AddAttendIdToTrip < ActiveRecord::Migration
  def change
    add_column :trips, :attend_id, :integer
  end
end
