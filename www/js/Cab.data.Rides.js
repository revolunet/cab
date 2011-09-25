Ext.ns('Cab.data');

Ext.regModel('Rides', {
    fields: [
        {name: 'end'},
        {name: 'start'},
        {name: 'time'},
        {name: 'tripId'},
        {name: 'selected'}
    ]
});

Cab.data.Rides = new Ext.data.Store({
    model: 'Rides',
    proxy: {
        type: 'scripttag',
        url: API_URL + 'trips/polling',
        reader: {
            type: 'json',
            root: 'rides'
        }
    }
});
