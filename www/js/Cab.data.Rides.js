Ext.ns('Cab.data');

Ext.regModel('Rides', {
    fields: [
        {name: 'end'},
        {name: 'start'},
        {name: 'userId'},
        {name: 'selected'}
    ]
});

Cab.data.Rides = new Ext.data.Store({
    model: 'Rides',
    proxy: {
        type: 'scripttag',
        url: 'polling.php',
        reader: {
            type: 'json',
            root: 'rides'
        }
    }
});
