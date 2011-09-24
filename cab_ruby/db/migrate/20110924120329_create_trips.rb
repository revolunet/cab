class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.string :departure
      t.string :arrival
      t.datetime :time
      t.text :description
      t.integer :user_id

      t.timestamps
    end
  end
end
