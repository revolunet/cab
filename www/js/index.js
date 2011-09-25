Ext.setup({

    onReady: function() {
        
        var fullscreen = true;

        new Cab.master.Layout({
            fullscreen: fullscreen
            // floating: !fullscreen,
            // centered: !fullscreen,
            // width: !Ext.is.Phone ? 320 : undefined,
            // height: !Ext.is.Phone ? 480 : undefined,
            // modal: false,
            // hideOnMaskTap: false
        }).show();

        var id = Cab.utils.loadUserId();

        Cab.utils.watchPosition();

    }

});
