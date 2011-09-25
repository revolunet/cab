Ext.ns('Cab.form');

Cab.form.DepartureList = Ext.extend(Ext.List, {

    initComponent:function() {
        
        Ext.apply(this, {
            itemTpl: '{name}',
            store: Cab.data.Location
        });

        Cab.form.DepartureList.superclass.initComponent.apply(this, arguments);

    }

});

Ext.reg('departure_list', Cab.form.DepartureList);