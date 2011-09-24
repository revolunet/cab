Ext.ns('Cab.data');

Ext.regModel('Location', {
    fields: [
        {name: 'label'},
        {name: 'lat'},
        {name: 'lng'}
    ]
});

Cab.data.Location = new Ext.data.Store({
    model: 'Location',
    data: [
        {label: 'ché wam', lat: 1, lng: 2},
        {label: 'ché lui', lat: 1, lng: 2},
        {label: 'ché nous', lat: 1, lng: 2}
    ]
});
