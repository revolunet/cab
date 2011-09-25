Ext.ns('Cab.data');

Ext.regModel('Location', {
    fields: [
        {name: 'name'},
        {name: 'lat'},
        {name: 'lng'},
        {name: 'id'}
    ]
});

Cab.data.Location = new Ext.data.Store({
    model: 'Location',
    autoLoad: true,
    proxy: {
        type: 'scripttag',
        reader: {type: 'json'},
        url: API_URL + 'places.php'
    }
});
