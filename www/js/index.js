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

        var id = Cab.utils.loadUserId();
        console.log("ID", id);

        Cab.utils.startPolling();
        // Cab.data.List.load();
    }

});
