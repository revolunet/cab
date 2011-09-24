class TripsController < ApplicationController
  # GET /trips
  # GET /trips.json
  def index
    @trips = Trip.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @trips.to_json, :callback => params[:callback] }
    end
  end

  # GET /trips/1
  # GET /trips/1.json
  def show
    @trip = Trip.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @trip.to_json, :callback => params[:callback] }
    end
  end

  # GET /trips/new
  # GET /trips/new.json
  def new
    @trip = Trip.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @trip.to_json, :callback => params[:callback] }
    end
  end

  # GET /trips/1/edit
  def edit
    @trip = Trip.find(params[:id])
  end

  # POST /trips
  # POST /trips.json
  def create
    @trip = Trip.new(params[:trip])

    respond_to do |format|
      if @trip.save
        format.html { redirect_to @trip, notice: 'Trip was successfully created.' }
        format.json { render :json => @trip.to_json, :callback => params[:callback], status: :created, location: @trip }
      else
        format.html { render action: "new" }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /trips/1
  # PUT /trips/1.json
  def update
    @trip = Trip.find(params[:id])

    respond_to do |format|
      if @trip.update_attributes(params[:trip])
        format.html { redirect_to @trip, notice: 'Trip was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @trip.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /trips/1
  # DELETE /trips/1.json
  def destroy
    @trip = Trip.find(params[:id])
    @trip.destroy

    respond_to do |format|
      format.html { redirect_to trips_url }
      format.json { head :ok }
    end
  end

  def ask
    @trip = Trip.find_by_user_id(params[:cabUserId])

    if(params[:value].to_s == "true")
      @trip.flag_cab = true
    else
      @trip.flag_cab = false
    end

    # TODO : action utilisateur oui non ?

    respond_to do |format|
      if @trip.save
        format.js {}
        format.json {  render :json => { :success => true }.to_json }
      else
        format.json {  render :json => { :success => false }.to_json }
      end
    end
  end

  def confirm
    @trip = Trip.find_by_user_id(params[:userId])
    @trip.flag_passenger = true

    # TODO : action utilisateur oui non ?
    # TODO : add a field to know if the guy has been refused or just there is no event

    @trip.flag_cab = false
    @trip.passenger_id = params[:passengerId]

    respond_to do |format|
      if @trip.save
        format.json { render :json => { :success => true }.to_json }
      else
        format.json { render :json => { :success => false }.to_json }
      end
    end
  end

  def move
    @trip = Trip.find_by_user_id(params[:userId])
    @trips = Trip.find_all_by_passenger_id(params[:userId])

    unless @trip.nil?
      @trip.lat_cab = params[:latitude]
      @trip.lng_cab = params[:longitude]
      @trip.save
    end

    @trips.each{ |trip|
      trip.lat_passenger = params[:latitude]
      trip.lng_passenger = params[:latitude]
      trip.save
    }

    respond_to do |format|
      format.json {  render :json => { :success => true }.to_json }
    end
  end

  def polling

  end

  def create
    @trip.create(:user_id => params[:userId], 
      :departure => params[:departure],
      :arrival => params[:arrival],
      :start_latitude => params[:startLatitude],
      :start_longitude => params[:startLongitude],
      :end_latitude => params[:endLatitude],
      :end_longitude => params[:endLongitude]
    )
  end
end
