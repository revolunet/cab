Ext.ns('Cab.master');

Ext.ns('Cab.master');

Cab.master.MapContainer = Ext.extend(Ext.Panel, {

    initComponent:function() {

        Ext.apply(this, {
            items: {xtype: 'xmap'},
            dockedItems: [{
                dock: 'bottom',
                xtype: 'toolbar',
                items: [{
                    html: 'gloves red',
                    xtype: 'container',
                    style: {color: 'rgb(255, 230, 27)'}
                }, {xtype: 'spacer'}, {
                    html: '15:00',
                    xtype: 'container',
                    style: {color: 'rgb(255, 230, 27)'}
                }]
            }]
        });

        Cab.master.MapContainer.superclass.initComponent.apply(this, arguments);

    }

});

Ext.reg('mapcontainer', Cab.master.MapContainer);


Cab.master.Map =  Ext.extend(Ext.Map, {
    // width:800,
    // height:400,
    delay:100,

    destination: {
        latitude:48.847081,
        longitude:2.386672
    },

    initComponent: function() {
        this.markers = {
            passenger: null,
            position: null,
            destination: null
        };
        
        this.mapOptions = {
           // center: this.markers['destination'].getPosition()
        };

        Cab.master.Map.superclass.initComponent.call(this);

        this.on('maprender', this.mapRendered);

        // this.task = setInterval(Ext.createDelegate(this.runTask, this), this.delay);
    },

    mapRendered: function() {
        this.markers['destination'] = this.createMarker('destination', this.destination.latitude, this.destination.longitude );
        this.updateMyPosition();
        this.updatePassenger();
        this.updateBounds();
    },

    updatePassenger:function (passengerPosition) {
        passengerPosition = {
            latitude:48.839583,
            longitude:2.39532
        }
        this.markers['passenger'] = this.createMarker('passenger', passengerPosition.latitude, passengerPosition.longitude );
    
    },
    // fakeMoves: 0,
    // fakeMove: function() {
    //     if (this.fakeMoves > 30) {
    //         clearInterval(this.task);
    //     }
    //     var offset = 0.0002;
    //     myPosition = {
    //         latitude:this.markers['position'].getPosition().lat()-(offset),
    //         longitude:this.markers['position'].getPosition().lng()+(offset*2)
    //     }
    //     this.markers['position'].setPosition( new google.maps.LatLng( myPosition.latitude, myPosition.longitude ) );
    //     if (!this.markers['passenger']) return;
    //     passengerPosition = {
    //         latitude:this.markers['passenger'].getPosition().lat()+offset,
    //         longitude:this.markers['passenger'].getPosition().lng()-offset
    //     }
    //     this.markers['passenger'].setPosition( new google.maps.LatLng( passengerPosition.latitude, passengerPosition.longitude ) ); 
    //     this.fakeMoves += 1;
    // },
    // runTask: function() {
    //     this.fakeMove();
    // },
    createMarker: function(type, latitude, longitude) {
        console.log('createMarker', arguments);
        var pos = new google.maps.LatLng( latitude, longitude );
        var opts = {
            icon:'img/poi-' + type + '.png',
            map:this.map,
            title:type,
            position: pos
        };
        console.log(opts);
        return new google.maps.Marker(opts);
    },
    positionReceived: function(position) {
        console.log('positionReceived', this, arguments);
        this.markers['position'] = this.createMarker('position', position.coords.latitude, position.coords.longitude );
        this.updateBounds();
    },
    updateMyPosition: function() {
        navigator.geolocation.getCurrentPosition( Ext.createDelegate(this.positionReceived, this, [], true) );
    },
    updateBounds: function() {
        this.bounds = new google.maps.LatLngBounds();
        this.bounds.extend( this.markers['destination'].getPosition() );
        if (this.markers['passenger']) {
            this.bounds.extend( this.markers['passenger'].getPosition() );
        }
        if (this.markers['position']) {
            this.bounds.extend( this.markers['position'].getPosition() );
        }
        console.log(this.bounds)
        this.map.fitBounds( this.bounds );
    }

});

Ext.reg('xmap', Cab.master.Map);