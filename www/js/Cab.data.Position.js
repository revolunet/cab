Ext.regModel('Position', {
    fields: [
        {name: 'label'},
        {name: 'value'}
    ],
    proxy: {
        type: 'scripttag',
        url: API_URL + 'move.php'
    }
});
