Ext.ns('Cab.rides');

Cab.rides.Layout = Ext.extend(Ext.form.FormPanel, {

    labelTpl: new Ext.XTemplate('<div class="x-layout-box-inner x-layout-box">'
            + '<div>'
                + '<div>{start.name}</div>'
                + '<div>{end.name}</div>'
            + '</div>'
            + '<div>'
                + '<div>{start.time}</div>'
            + '</div>'
        + '</div>', {compiled: true}),

    initComponent:function() {
        Cab.rides.Layout.superclass.initComponent.apply(this, arguments);
        Cab.data.Rides.on('load', this.onStoreLoad, this);
    },

    afterRender: function() {
        Cab.rides.Layout.superclass.afterRender.apply(this, arguments);
        if (Cab.data.Rides.getCount()) {
            this.createFields();
        }
    },

    onStoreLoad: function() {
        console.log('onStoreLoad', this, arguments);
        this.createFields();
    },

    createFields: function() {
        console.log('createFields', this, arguments);
        this.removeAll();
        Cab.data.Rides.each(function(record, index) {
            console.log("RECORDS", record);
            this.add({
                xtype: 'checkboxfield',
                fieldLabel: this.labelTpl.apply(record.data)
            });
        }, this);
        this.doLayout();
    }

});

Ext.reg('rides', Cab.rides.Layout);