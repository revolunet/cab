Ext.setup({

    onReady: function() {

        new Cab.master.Layout({
            // fullscreen: true
            floating: true,
            centered: true,
            width: 320,
            height: 480,
            modal: false,
            hideOnMaskTap: false
        }).show();

        // Cab.data.List.load();
    }

});
