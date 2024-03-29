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
            {attr: 'departure', label: 'Départ'},
            {attr: 'arrival', label: 'Arrivée'},
            {attr: 'time', label: 'Heure dep.'},
            {attr: 'description', label: 'Tenue'}

        // {attr: 'departure', label: 'Départ', value: 4, dislayValue: 'test'},
        // {attr: 'arrival', label: 'Arrivée', value:5, dislayValue: 'test'},
        // {attr: 'time', label: 'Heure dep.', value: '15:00', dislayValue: '15:00'},
        // {attr: 'description', label: 'Tenue', value: 'red gloves', dislayValue: 'red gloves'}
    ],
    reset: function() {
        this.loadData([
            {attr: 'departure', label: 'Départ'},
            {attr: 'arrival', label: 'Arrivée'},
            {attr: 'time', label: 'Heure dep.'},
            {attr: 'description', label: 'Tenue'}
            // {attr: 'departure', label: 'Départ', value: 4, dislayValue: 'test'},
            // {attr: 'arrival', label: 'Arrivée', value:5, dislayValue: 'test'},
            // {attr: 'time', label: 'Heure dep.', value: '15:00', dislayValue: '15:00'},
            // {attr: 'description', label: 'Tenue', value: 'red gloves', dislayValue: 'red gloves'}
        ]);
    }
});
