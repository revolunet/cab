Ext.regModel('Trip', {
    fields: [
        {name: 'label'},
        {name: 'value'},
        {name: 'displayValue'}
    ],
    proxy: {
        type: 'scripttag',
        url: API_URL + 'create_trip'
    }
});

Cab.data.Trip = new Ext.data.Store({
    model: 'Trip',
    data: [
        {label: 'departure', value: 2, dislayValue: 'test'},
        {label: 'arrival', value:3, dislayValue: 'test'},
        {label: 'time', value: '09:00', dislayValue: '09:00'},
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
