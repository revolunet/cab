Ext.regModel('Trip', {
    fields: [
        {name: 'label'},
        {name: 'value'},
        {name: 'displayValue'}
    ],
    proxy: {
        type: 'scripttag',
        url: API_URL + 'trips/create_trip'
    }
});

Cab.data.Trip = new Ext.data.Store({
    model: 'Trip',
    data: [
        {label: 'departure', value: 4, dislayValue: 'test'},
        {label: 'arrival', value:5, dislayValue: 'test'},
        {label: 'time', value: '11:00', dislayValue: '11:00'},
        {label: 'description', value: 'red gloves', dislayValue: 'red gloves'}
    ],
    reset: function() {
        this.loadData([
            {label: 'departure', value: 42, dislayValue: 'titi'},
            {label: 'arrival', value: '', dislayValue: ''},
            {label: 'time', value: '', dislayValue: ''},
            {label: 'description', value: '', dislayValue: ''}
        ]);
    }
});
