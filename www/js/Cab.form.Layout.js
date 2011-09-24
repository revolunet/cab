Ext.ns('Cab.form');

Cab.form.Layout = Ext.extend(Ext.Panel, {

    bubbleEvents: ['arrivalTap', 'departureTap', 'goTap'],

    initComponent:function() {

        this.list = {
            xtype: 'list',
            itemTpl: '{label}: {value}',
            store: Cab.data.Trip,
            listeners: {
                scope: this,
                itemtap: this.onItemTap
            }
        };

        this.timePicker = new Cab.form.TimePicker({
            listeners: {
                scope: this,
                hide: function(picker) {
                    this.fireEvent('timetap', picker, picker.getValue())
                }
            }
        });

        this.apparelPicker = new Cab.form.ApparelPicker({
            listeners: {
                scope: this,
                hide: function(picker) {
                    this.fireEvent('appareltap', picker, picker.getValue())
                }
            }
        });

        this.button = {
            xtype: 'button',
            text: 'GO',
            width: 100,
            style: {margin: '20px auto'},
            handler: Ext.createDelegate(this.fireEvent, this, ['goTap'], false)
        };

        // this.form = {
        //     xtype: 'formpanel',
        //     items:[{
        //         xtype: 'spinnerfield',
        //         minValue: 0,
        //         maxValue: 24,
        //         incrementValue: 1,
        //         cycle: true
        //         // options: Cab.data.Times
        //     }]
        // };

        Ext.apply(this, {
            items: [this.list, this.button]
        });

        Cab.form.Layout.superclass.initComponent.apply(this, arguments);

        this.on('onBackTap', this.onBackTap, this);

    },

    onItemTap: function(list, index) {
        var record = this.list.store.getAt(index);
        console.log('onItemTap', this, arguments, record, record.get('label'));
        var label = record.get('label');
        if (label === 'from') {
            console.warn("FIRE departureTap");
            this.fireEvent('departureTap');
        } else if (label === 'to') {
            console.warn("FIRE arrivalTap");
            this.fireEvent('arrivalTap');
        } else if (label === 'time') {
            this.timePicker.show();
        } else if (label === 'apparel') {
            this.apparelPicker.show();
        }
        // this.fireEvent('showBack');
    },

    // onListItemTap: function(list, index) {
    //     console.log('onListItemTap', this, arguments);
    //     var record = list.store.getAt(index);
    // },

    onBackTap: function() {
        console.log('onBackTap', this, arguments);
        // this.setActiveCard('');
    }

});

Ext.reg('form', Cab.form.Layout);