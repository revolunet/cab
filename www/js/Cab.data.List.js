Ext.ns('Cab.data');

Ext.regModel('List', {
    fields: [
        {name: 'departure'},
        {name: 'arrival'},
        {name: 'time'},
        {name: 'apparel'}
    ]
});

Cab.data.List = new Ext.data.Store({
    model: 'List',
    proxy: {
        type: 'scripttag',
        reader: {type: 'json'},
        url: 'http://172.16.60.65:3000/trips/'
    }
});
