Ext.regModel('Confirm', {
    fields: [
        {name: 'label'},
        {name: 'value'}
    ],
    proxy: {
        type: 'scripttag',
        url: API_URL + 'confirm.php'
    }
});
