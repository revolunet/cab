Ext.ns('Cab.data');

Ext.regModel('Rides', {
    fields: [
        {name: 'end'},
        {name: 'start'},
        {name: 'tripId'},
        {name: 'selected'}
    ]
});

Cab.data.Rides = new Ext.data.Store({
    model: 'Rides',
    proxy: {
        type: 'scripttag',
        url: 'http://172.16.60.65:3000/trips/polling',
        reader: {
            type: 'json',
            root: 'rides'
        }
    }
});
