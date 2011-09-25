Ext.ns('Cab.rides');

Cab.rides.Layout = Ext.extend(Ext.Panel, {

    scroll: 'vertical',
    cls: 'rides-layout',

    labelTpl: new Ext.XTemplate(
        '<div class="x-layout-box-inner x-layout-box">'
            // + '<div style="width: 40px;text-align: right;padding-right: 5px">'
            //     + '<div>De:</div>'
            //     + '<div>Vers:</div>'
            // + '</div>'
            + '<div style="-webkit-box-flex: 1; font-weight: normal; font-size: 13px;">'
                + '<div><span style="font-size: 13px;font-weight: bold; display: inline-block; width: 50px; text-align: right; padding-right: 5px">De:</span>{start}</div>'
                + '<div><span style="font-size: 13px;font-weight: bold; display: inline-block; width: 50px; text-align: right; padding-right: 5px">Vers:</span>{end}</div>'
                + '<div style="margin-top: 5px"><span style="font-size: 13px;font-weight: bold; display: inline-block; width: 50px; text-align: right; padding-right: 5px">Tenue:</span>{description}</div>'
            + '</div>'
            + '<div style="padding: 5px">{time}</div>'
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
        console.log('createFields', this, arguments, Cab.data.Rides.getCount());
        this.removeAll();
        var userId = Cab.utils.userId;
        
        if (Cab.data.Rides.getCount()) {
            Cab.data.Rides.each(function(record, index) {
                console.log("RECORDS", record);
                // var remoteUserId = record.get('userId');
                this.add({
                    // xtype: userId === tripId ? 'checkboxfield' : 'field',
                    // labelWidth: userId === tripId ? '80%' : '100%',
                    xtype: 'checkboxfield',
                    // cls: 'hidden-check',
                    labelWidth: '80%',
                    tripId: record.get('tripId'),
                    // disabled: userId === remoteUserId,
                    checked: record.get('selected'),
                    label: this.labelTpl.apply(record.data),
                    listeners: {
                        check: this.fieldChange,
                        uncheck: this.fieldChange
                    }
                });
            }, this);
        } else {
            console.warn("EMPTY", this, arguments);
            this.add({
                width: 280,
                xtype: 'container',
                cls: 'empty-result',
                style: {
                    margin: '20px auto',
                    'text-align': 'center'
                },
                html: 'Nous sommes à la recherche d\'un utilisateur pouvant partager votre trajet.<br />Veuillez patienter...<br /><div class="x-mask-loading" style="width: 50px;margin: 20px auto 0;"><div class="x-loading-spinner"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div></div>'
            });
        }

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