Ext.ns('Cab.rides');

Cab.rides.Layout = Ext.extend(Ext.form.FormPanel, {

    labelTpl: new Ext.XTemplate(
        '<div class="x-layout-box-inner x-layout-box">'
            + '<div style="-webkit-box-flex: 1">'
                + '<div>{start}</div>'
                + '<div>{end}</div>'
            + '</div>'
            + '<div>'
                + '<div style="margin: 5px">{time}</div>'
            + '</div>'
        + '</div>', {compiled: true}),

    initComponent:function() {
        Cab.rides.Layout.superclass.initComponent.apply(this, arguments);
        this.mon(Cab.data.Rides, 'load', this.onStoreLoad, this);
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
        var userId = Cab.utils.userId;
        Cab.data.Rides.each(function(record, index) {
            console.log("RECORDS", record);
            var tripId = record.get('tripId');
            this.add({
                // xtype: userId === tripId ? 'checkboxfield' : 'field',
                // labelWidth: userId === tripId ? '80%' : '100%',
                xtype: 'checkboxfield',
                // cls: 'hidden-check',
                labelWidth: '80%',
                tripId: tripId,
                disabled: userId === tripId,
                checked: record.get('selected'),
                label: this.labelTpl.apply(record.data),
                listeners: {
                    check: this.fieldChange,
                    uncheck: this.fieldChange
                }
            });
        }, this);
        this.doLayout();
    },

    fieldChange: function(field) {
        console.log('fieldChange', this, arguments);
        var ride = Ext.ModelMgr.getModel('Ride');

        ride.load('42', {
            scope: this,
            params: {
                value: field.isChecked(),
                userId: Cab.utils.userId,
                tripId: field.tripId
            }
            // callback: function(model, response) {
            //     console.log("callback", this, arguments);
            //     Cab.utils.startPolling();
            //     var card = self.setActiveCard(self.getRides());
            //     self.showBack();
            // }
        });
    }

});

Ext.reg('rides', Cab.rides.Layout);