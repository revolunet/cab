Ext.ns('Cab.data');

Ext.regModel('Rides', {
    fields: [
        {name: 'departure'},
        {name: 'arrival'},
        {name: 'time'},
        {name: 'apparel'}
    ]
});

Cab.data.Rides = new Ext.data.Store({
    model: 'Rides'
    // proxy: {
    //     type: 'scripttag',
    //     reader: {type: 'json'},
    //     url: 'http://172.16.60.65:3000/trips/'
    // }
});
