Ext.regModel('Trip', {
    fields: [
        {name: 'label'},
        {name: 'value'}
    ]
});

Cab.data.Trip = new Ext.data.Store({
    model: 'Trip',
    data: [
        {label: 'from'},
        {label: 'to'},
        {label: 'time'},
        {label: 'apparel'}
    ]
});
