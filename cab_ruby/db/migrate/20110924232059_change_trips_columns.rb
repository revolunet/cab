class ChangeTripsColumns < ActiveRecord::Migration
  def up
    Trip.all.each{ |trip|
      trip.departure = nil
      trip.arrival = nil
      trip.save
    }
  end

  def down
  end
end
