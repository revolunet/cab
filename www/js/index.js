Ext.setup({

    onReady: function() {

        new Cab.master.Layout({
            fullscreen: Ext.is.Phone,
            floating: !Ext.is.Phone,
            centered: !Ext.is.Phone,
            width: !Ext.is.Phone ? 320 : undefined,
            height: !Ext.is.Phone ? 480 : undefined,
            modal: false,
            hideOnMaskTap: false
        }).show();

        var id = Cab.utils.loadUserId();

        Cab.utils.watchPosition();

    }

});
