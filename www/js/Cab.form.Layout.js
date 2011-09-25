Ext.ns('Cab.form');

Cab.form.Layout = Ext.extend(Ext.Panel, {

    bubbleEvents: ['arrivalTap', 'departureTap', 'goTap'],

    initComponent:function() {

        this.list = {
            xtype: 'list',
            itemTpl: '{label}: {displayValue}',
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
        if (label === 'departure') {
            console.warn("FIRE departureTap");
            this.fireEvent('departureTap');
        } else if (label === 'arrival') {
            console.warn("FIRE arrivalTap");
            this.fireEvent('arrivalTap');
        } else if (label === 'time') {
            this.timePicker.show();
        } else if (label === 'description') {
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
    },

    formatDate: function(time) {
        console.log('formatDate', this, arguments);
        var dt = new Date();
        var year = dt.format('Y');
        var month = dt.format('m');
        var day = dt.format('d');
        // var hour = time.split(':')[0];
        // var minute = time.split(':')[1];

        return year + '/' + month + '/' + day + '/' + ' ' + time + ':00';
    },

    getValues: function() {
        var records = this.list.store.getRange();
        console.log('getValues', this, arguments, records);
        values = {};
        this.list.store.each(function(record, index) {
            values[record.get('label')] = record.get('value');
        });

        values.time = this.formatDate(values.time);
        
        return values;
    },

    reset: function() {
        console.log('reset', this, arguments);
        this.list.store.reset();
    },

});

Ext.reg('form', Cab.form.Layout);