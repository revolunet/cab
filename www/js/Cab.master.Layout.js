Ext.ns('Cab.master');

Cab.master.Layout = Ext.extend(Ext.ux.CardPanel, {

    initComponent:function() {

        Ext.apply(this, {
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                title: 'TAXI CO.',
                items: [{
                    ui: 'back',
                    text: 'back',
                    hidden: true,
                    xtype: 'button',
                    scope: this,
                    handler: this.onBackTap
                }]
            }]
            ,items: this.getForm()
        });

        Cab.master.Layout.superclass.initComponent.apply(this, arguments);

        this.on('showBack', this.showBack, this);

    },

    afterRender: function() {
        Cab.master.Layout.superclass.afterRender.apply(this, arguments);
        Cab.utils.removeLoadMask();
    },

    onBackTap: function() {
        console.log('onBackTap', this, arguments);
        this.items.first().fireEvent('backTap');
    },

    onTimetap: function(picker, values) {
        console.log('onTimetap', this, arguments);
        var card = this.getActiveItem();
        card.list.store.getAt(2).set('value', values.hours + ':' + values.minutes);
    },

    onApparelTap: function(picker, values) {
        console.log('onApparelTap', this, arguments);
        var card = this.getActiveItem();
        card.list.store.getAt(3).set('value', values.cloth + ':' + values.color);
    },

    onDepartureTap: function() {
        console.log('departureTap', this, arguments);
        var card = this.setActiveCard('departure_list');
        card.on('itemTap', this.onDepartureListItemTap, this, {single: true});
    },

    onDepartureListItemTap: function(list, index) {
        var record = list.store.getAt(index);
        var card = this.setActiveCard(this.getForm());
        card.list.store.getAt(0).set('value', record.get('label'));
    },

    onArrivalTap: function() {
        console.log('onArrivalTap', this, arguments);
        var card = this.setActiveCard('arrival_list');
        card.on('itemTap', this.onArrivalListItemTap, this, {single: true});
    },

    onArrivalListItemTap: function(list, index) {
        console.log('onArrivalListItemTap', this, arguments);
        var record = list.store.getAt(index);
        var card = this.setActiveCard(this.getForm());
        card.list.store.getAt(1).set('value', record.get('label'));
    },

    showBack: function() {
        console.log('showBack', this, arguments, this.dockedItems);
        this.dockedItems.first().items.first().show();
    },

    getForm: function() {
        return {
            xtype: 'form',
            listeners: {
                scope: this,
                timeTap: this.onTimetap,
                appareltap: this.onApparelTap,
                arrivalTap: this.onArrivalTap,
                departureTap: this.onDepartureTap
            }
        };
    }

});

Ext.reg('master', Cab.master.Layout);