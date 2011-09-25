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
    @trip = Trip.find_by_user_id(params[:tripId])

    @trip.flag_first_cab = true
    if(params[:value].to_s == "true")
      @trip.flag_cab = true
      @trip.passenger_id = nil
    else
      @trip.flag_cab = false
      @trip.passenger_id = nil
    end

    # TODO : action utilisateur oui non ? si c'est une action utilisateur il faut que le propriétaire soit informé

    respond_to do |format|
      if @trip.save
        format.js {}
        format.json {  render :json => { :success => true }.to_json, :callback => params[:callback] }
      else
        format.json {  render :json => { :success => false }.to_json, :callback => params[:callback] }
      end
    end
  end

  def confirm

#    if(params[:value].to_s == "true")

    @trip = Trip.find_by_user_id(params[:userId])
    @trip.flag_passenger = true
    @trip.flag_first_passenger = true

    # TODO : action utilisateur oui non ?
    # TODO : add a field to know if the guy has been refused or just there is no event

    @trip.flag_cab = false
    @trip.passenger_id = params[:passengerId]

    respond_to do |format|
      if @trip.save
        format.json { render :json => { :success => true }.to_json, :callback => params[:callback] }
      else
        format.json { render :json => { :success => false }.to_json, :callback => params[:callback] }
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
      format.json {  render :json => { :success => true }.to_json, :callback => params[:callback] }
    end
  end

  def polling

    rides = Trip.all(:conditions => ["time > ? AND (flag_cab is null OR flag_cab = false) AND (passenger_id is null OR (passenger_id = ? AND flag_passenger = false))", Time.now, params[:userId] ])

    @trips = Trip.all(:conditions => { :passenger_id => params[:userId] , :flag_first_cab => true })

    @trip = @trips.first
    unless @trip.nil?
      @trip.flag_first_cab = false
      @trip.save
    end

    @trips2 = Trip.all(:conditions => { :passenger_id => params[:userId] , :flag_first_passenger => true })
    @trip2 = @trips2.first
    unless @trip2.nil?
      @trip2.flag_first_passenger = false
      @trip2.save
    end

    poll = {
      :request => {
        :tripId => 
          if(@trip)
            @trip.user_id
          end,
        :date => Time.now.strftime("%R")
      },
      :response => {
        :tripId => 
          if(@trip2)
            @trip2.user_id
          end,
        :date => Time.now.strftime("%R"),
        :success => 
          if(@trip2)
            @trip2.flag_passenger
          end
      },
      :rides => rides,
      :passenger => {
        :tripId => "",
        :latitude => 0,
        :longitude => 0,
        :destination => {
            :name => "",
            :latitude => 0,
            :longitude => 0
        }
      }
    }

    respond_to do |format|
      format.json {  render :json => poll.to_json, :callback => params[:callback] }
    end
  end

  def create_trip

    if(Trip.find_by_user_id(params[:userId]))
      Trip.destroy_all(:user_id => params[:userId])
      Trip.create(
        :user_id => params[:userId],
        :departure_id => params[:departure],
        :arrival_id => params[:arrival],
        :time => params[:time],
        :description => params[:description]
      )
    else
      Trip.create(
        :user_id => params[:userId],
        :departure_id => params[:departure],
        :arrival_id => params[:arrival],
        :time => params[:time],
        :description => params[:description]
      )
    end

    respond_to do |format|
      format.json {  render :json => { :success => true }.to_json, :callback => params[:callback] }
    end

  end
end
