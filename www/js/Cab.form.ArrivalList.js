Ext.ns('Cab.form');

Cab.form.ArrivalList = Ext.extend(Ext.List, {

    initComponent:function() {

        Ext.apply(this, {
            itemTpl: '{label}',
            store: Cab.data.Location
        });

        Cab.form.ArrivalList.superclass.initComponent.apply(this, arguments);

    }

});

Ext.reg('arrival_list', Cab.form.ArrivalList);