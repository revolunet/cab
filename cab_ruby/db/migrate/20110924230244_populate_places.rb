class PopulatePlaces < ActiveRecord::Migration
  def up
    Place.create(:name => "Opera Bastille", :lat => 48.853986, :lng => 2.369957)
    Place.create(:name => "Aeroport Orly", :lat => 48.729134, :lng => 2.369099)
    Place.create(:name => "Place Italie", :lat => 48.831758, :lng => 2.355988)
    Place.create(:name => "Place de la Republique", :lat => 48.867354, :lng => 2.363927)
    Place.create(:name => "Metro Montmartre", :lat => 48.884586, :lng => 2.345238)
    Place.create(:name => "Place Daumesnil", :lat => 48.846869, :lng => 2.376051)
    Place.create(:name => "Place Vendome", :lat => 48.867481, :lng => 2.329209)
    Place.create(:name => "Gare de Lyon", :lat => 48.844723, :lng => 2.373862)
    Place.create(:name => "Gare Montparnasse", :lat => 48.840797, :lng => 2.319467)
    Place.create(:name => "Parc des expositions Villepinte", :lat => 48.973781, :lng => 2.514839)
  end

  def down
  end
end
