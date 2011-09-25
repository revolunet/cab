Ext.regModel('Ride', {
    fields: [
        {name: 'label'},
        {name: 'value'}
    ],
    proxy: {
        type: 'scripttag',
        url: API_URL + 'trips/ask'
    }
});
