# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(:first_name => "Sheryl", :last_name => "Crow" , :login => "Sheryl" , :password => "Sheryl", :description => "I am a chanteuse", :sex => "F", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Robert", :last_name => "Redford" , :login => "Robert" , :password => "Robert", :description => "", :sex => "M", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Brad", :last_name => "Pitt" , :login => "Brad" , :password => "Brad", :description => "", :sex => "M", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "George", :last_name => "Clooney" , :login => "George" , :password => "George", :description => "", :sex => "M", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Marion", :last_name => "Cotilliard" , :login => "Marion" , :password => "Marion", :description => "", :sex => "F", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Junior", :last_name => "Joanis" , :login => "Junior" , :password => "Junior", :description => "", :sex => "M", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Jeanne", :last_name => "d'Arc" , :login => "Jeanne" , :password => "Jeanne", :description => "", :sex => "F", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Johnny", :last_name => "Depp" , :login => "Johnny" , :password => "Johnny", :description => "", :sex => "M", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Jim", :last_name => "Morisson" , :login => "Jim" , :password => "Jim", :description => "", :sex => "M", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Will", :last_name => "Smith" , :login => "Will" , :password => "Will", :description => "", :sex => "M", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Angelina", :last_name => "Jolie" , :login => "Angelina" , :password => "Angelina", :description => "", :sex => "F", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Britney", :last_name => "Spears" , :login => "Britney" , :password => "Britney", :description => "", :sex => "F", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Lady", :last_name => "Gaga" , :login => "Lady" , :password => "Lady", :description => "", :sex => "F", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Axelle", :last_name => "Red" , :login => "Axelle" , :password => "Axelle", :description => "", :sex => "F", :created_at => Time.now + 100, :updated_at => Time.now + 100)
User.create(:first_name => "Romain", :last_name => "Duris" , :login => "Romain" , :password => "Romain", :description => "", :sex => "M", :created_at => Time.now + 100, :updated_at => Time.now + 100)


Trip.create(:departure => "Opera, Bastille", :arrival => "Fontaine, Chatelet", :time => Time.now + 200 , :description => "", :user_id => 1)
Trip.create(:departure => "Nation, Paris", :arrival => "Fontaine, Saint Michel", :time => Time.now + 400 , :description => "", :user_id => 2)
Trip.create(:departure => "Chatelet, Paris", :arrival => "Fontaine, Saint Michel", :time => Time.now + 600 , :description => "", :user_id => 3)
Trip.create(:departure => "Buttes Chaumont, Paris", :arrival => "Saint Lazare, Paris", :time => Time.now + 800 , :description => "", :user_id => 4)
Trip.create(:departure => "Chatelet, Paris", :arrival => "Fontaine, Saint Michel", :time => Time.now + 1000 , :description => "", :user_id => 5)
Trip.create(:departure => "Mc Do, Denfert Rochereau, Paris", :arrival => "Fontaine, Saint Michel, Paris", :time => Time.now + 1000 , :description => "", :user_id => 6)