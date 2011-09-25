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
                }],
            // } ,{
            //     dock: 'bottom',
            //     xtype: 'toolbar',
            //     items: [{
            //         html: 'gloves red',
            //         xtype: 'container',
            //         style: {color: 'rgb(255, 230, 27)'}
            //     }, {xtype: 'spacer'}, {
            //         html: '15:00',
            //         xtype: 'container',
            //         style: {color: 'rgb(255, 230, 27)'}
            //     }]
            }]
            ,items: {
                xtype: 'login',
                listeners: {el: {
                    scope: this,
                    tap: this.onLoginTap
                }}
            }
        });

        Cab.master.Layout.superclass.initComponent.apply(this, arguments);

        this.on({
            showBack: this.showBack,
            cardactivated: this.onCardActivation
        });

        Cab.data.Rides.on({
            scope: this,
            accept: this.onAccpect,
            decline: this.onDecline
        });

    }, 

    onCardActivation: function() {
        console.log('onCardActivation', this, arguments);
        this.setLoading(false);
    },

    onDecline: function() {
        this.setActiveCard( this.getForm() );
    },

    onAccpect: function() {
        console.warn("onAccpect", this, arguments);
        this.setActiveCard( this.getMap() );
    },

    onRidesLoad: function() {
        console.log('onRidesLoad', this, arguments);  
    },

    afterRender: function() {
        Cab.master.Layout.superclass.afterRender.apply(this, arguments);
        Cab.utils.removeLoadMask();
    },

    onLoginTap: function() {
        console.log("onLoginTap", this, arguments);
        this.setActiveCard(this.getForm());
    },

    onBackTap: function() {
        console.log('onBackTap', this, arguments);
        var card = this.setActiveCard(this.getForm());
        card.reset();
        Cab.utils.stopPolling();
        this.hideBack();
    },

    onGoTap: function() {
        console.log('onGoTap', this, arguments);
        var self = this,
            card = this.getActiveItem(),
            params = card.getValues();

        console.warn("go", params,     !params.arrival, !params.arrival.length, !params.departure, !params.departure.length, !params.description, !params.description.length, !params.time, !params.time.length);

        if (
            !params.arrival
            || !params.departure
            || !params.description || !params.description.length
            || !params.time || !params.time.length
        ) return;

        this.setLoading(true);

        params.userId = Cab.utils.userId;

        var trip = Ext.ModelMgr.getModel('Trip');

        trip.load('42', {
            scope: this,
            params: params,
            callback: function(model, response) {
                console.log("callback", this, arguments);
                Cab.utils.startPolling();
                var card = self.setActiveCard(self.getRides());
                self.showBack();
            }
        });
    },

    onTimetap: function(picker, values) {
        console.log('onTimetap', this, arguments);
        var card = this.getActiveItem();
        var hours = values.hours > 9 ? values.hours : '0'+values.hours;
        var minutes = values.minutes > 9 ? values.minutes : '0'+values.minutes;
        var time = values.hours + ':' + values.minutes;
        card.list.store.getAt(2).set('value', time);
        card.list.store.getAt(2).set('displayValue', time);
    },

    onApparelTap: function(picker, values) {
        console.log('onApparelTap', this, arguments);
        var card = this.getActiveItem();
        var apparel = values.color + ' ' + values.cloth;
        card.list.store.getAt(3).set('value', apparel);
        card.list.store.getAt(3).set('displayValue', apparel);
    },

    onDepartureTap: function() {
        console.log('departureTap', this, arguments);
        var card = this.setActiveCard('departure_list', 'slide');
        card.on('itemTap', this.onDepartureListItemTap, this, {single: true});
    },

    onDepartureListItemTap: function(list, index) {
        var record = list.store.getAt(index);
        var card = this.setActiveCard(this.getForm(), {type: 'slide', direction: 'right'});
        var row = card.list.store.getAt(0);
        console.log("onDepartureListItemTap", record, row);
        row.set('value', record.get('id'));
        row.set('displayValue', record.get('name'));
    },

    onArrivalTap: function() {
        console.log('onArrivalTap', this, arguments);
        var card = this.setActiveCard('arrival_list', 'slide');
        card.on('itemTap', this.onArrivalListItemTap, this, {single: true});
    },

    onArrivalListItemTap: function(list, index) {
        console.log('onArrivalListItemTap', this, arguments);
        var record = list.store.getAt(index);
        var card = this.setActiveCard(this.getForm(), {type: 'slide', direction: 'right'});
        var row = card.list.store.getAt(1);
        row.set('value', record.get('id'));
        row.set('displayValue', record.get('name'));
    },

    onRidesItemTap: function(list, index) {
        console.log('onRidesItemTap', this, arguments);  
    },

    showBack: function() {
        console.log('showBack', this, arguments, this.dockedItems);
        this.dockedItems.first().items.first().show();
    },

    hideBack: function() {
        console.log('hideBack', this, arguments);
        this.dockedItems.first().items.first().hide();
    },

    getForm: function() {
        return {
            xtype: 'form',
            listeners: {
                scope: this,
                goTap: this.onGoTap,
                timeTap: this.onTimetap,
                appareltap: this.onApparelTap,
                arrivalTap: this.onArrivalTap,
                departureTap: this.onDepartureTap
            }
        };
    },

    getRides: function() {
        console.log('getRides', this, arguments);
        return {
            xtype: 'rides',
            listeners: {
                scope: this,
                itemTap: this.onRidesItemTap
            }
        };
    },

    getMap: function() {
        console.log("getMap", this, arguments);
        return {
            xtype: 'xmap'
        };
    }

});

Ext.reg('master', Cab.master.Layout);