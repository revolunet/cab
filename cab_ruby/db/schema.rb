# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110925012605) do

  create_table "places", :force => true do |t|
    t.string   "name"
    t.float    "lat"
    t.float    "lng"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "trips", :force => true do |t|
    t.datetime "time"
    t.text     "description"
    t.string   "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "passenger_id"
    t.boolean  "flag_cab"
    t.boolean  "flag_passenger"
    t.float    "lat_cab"
    t.float    "lng_cab"
    t.float    "lat_passenger"
    t.float    "lng_passenger"
    t.integer  "departure_id"
    t.integer  "arrival_id"
    t.boolean  "flag_first_cab"
    t.boolean  "flag_first_passenger"
  end

  create_table "user_sessions", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "login"
    t.string   "password"
    t.text     "description"
    t.string   "sex"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
