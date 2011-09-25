Ext.regModel('Position', {
    fields: [
        {name: 'label'},
        {name: 'value'}
    ],
    proxy: {
        type: 'scripttag',
        url: 'http://172.16.60.65:3000/trips/move'
    }
});
