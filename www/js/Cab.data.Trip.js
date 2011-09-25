Ext.regModel('Trip', {
    fields: [
        {name: 'label'},
        {name: 'value'},
        {name: 'displayValue'}
    ],
    proxy: {
        type: 'scripttag',
        url: 'http://172.16.60.65:3000/trips/create_trip'
    }
});

Cab.data.Trip = new Ext.data.Store({
    model: 'Trip',
    data: [
        {label: 'departure', value: 42, dislayValue: 'toto'},
        {label: 'arrival', value: '', dislayValue: ''},
        {label: 'time', value: '', dislayValue: ''},
        {label: 'description', value: '', dislayValue: ''}
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
