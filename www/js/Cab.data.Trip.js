Ext.regModel('Trip', {
    fields: [
        {name: 'label'},
        {name: 'value'},
        {name: 'displayValue'}
    ],
    proxy: {
        type: 'scripttag',
        url: API_URL + 'create_trip.php'
    }
});

Cab.data.Trip = new Ext.data.Store({
    model: 'Trip',
    data: [
        {label: 'departure', value: 4, dislayValue: 'test'},
        {label: 'arrival', value:5, dislayValue: 'test'},
        {label: 'time', value: '15:00', dislayValue: '15:00'},
        {label: 'description', value: 'red gloves', dislayValue: 'red gloves'}
    ],
    reset: function() {
        this.loadData([
            {label: 'departure', value: 4, dislayValue: 'test'},
            {label: 'arrival', value:5, dislayValue: 'test'},
            {label: 'time', value: '15:00', dislayValue: '15:00'},
            {label: 'description', value: 'red gloves', dislayValue: 'red gloves'}
        ]);
    }
});
