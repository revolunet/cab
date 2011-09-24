Ext.ns('Cab.rides');

Cab.rides.Layout = Ext.extend(Ext.Container, {

    initComponent:function() {

        Ext.apply(this, {
            itemTpl: '{label}',
            store: Cab.data.Rides
        });

        Cab.rides.Layout.superclass.initComponent.apply(this, arguments);

    }

});

Ext.reg('rides', Cab.rides.Layout);