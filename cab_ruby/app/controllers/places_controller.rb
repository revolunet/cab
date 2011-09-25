class PlacesController < ApplicationController
  def index
    @places = Place.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @places.to_json, :callback => params[:callback] }
    end
  end

end
