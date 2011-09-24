class ModifyAndAddColumns < ActiveRecord::Migration
  def up
    change_column :trips, :user_id, :string
    change_column :trips, :attend_id, :string
    rename_column :trips, :attend_id, :passenger_id
    add_column :trips, :flag_cab, :boolean
    add_column :trips, :flag_passenger, :boolean
  end

  def down
  end
end
