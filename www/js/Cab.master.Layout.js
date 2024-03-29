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
            }, {
                hidden: true,
                dock: 'bottom',
                xtype: 'toolbar',
                items: [{
                    html: 'gloves red',
                    xtype: 'container',
                    style: {color: 'rgb(255, 230, 27)'}
                }, {xtype: 'spacer'}, {
                    html: '15:00',
                    xtype: 'container',
                    style: {color: 'rgb(255, 230, 27)'}
                }]
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
            //accept: this.onAccept,
          //  decline: this.onDecline,
            load: this.onRidesLoad
        });

    },
     
    onRidesLoad: function(store, records) {
        //console.log('ACTIVECARD', this.getActiveCard());

        var card = this.getActiveItem();
        if (card.cls!='rides-layout') return; 
        
        var data = store.proxy.reader.rawData;
        if (data.request) {
            // received a share request

            // Confirmation alert
            Ext.Msg.confirm("Nouvelle demande de partage", "Souhaitez vous partager votre taxi?", function(btnId) {
                console.log('MESSAGE', arguments, data.request);
                
                var confirm = Ext.ModelMgr.getModel('Confirm');

                confirm.load('42', {
                    scope: this,
                    params: {
                        userId: Cab.utils.userId,
                        passengerId:data.request.userId,
                        tripId:data.request.tripId,
                        value:(btnId == 'yes')
                    }
                });

                if (btnId!='yes') {
                    //this.fireEvent('decline');
                    this.onDecline();
                } else {
                    //this.fireEvent('accept', this);
                    this.onAccept(data.request);
                }

            }, this);
        }
        if (data.response) {
            // received a share request response
            console.log('received a response', data.response);
            if (data.response.success == "1") {
                Ext.Msg.alert("Demande acceptée", "Votre demande de partage a été acceptée", function(btnId) {
                    console.warn("DEMAND RESPONSE", btnId, data.response);
                     if (btnId === 'ok') {
                         //this.fireEvent('accept', this);
                         this.onAccept(data.response);
                     }
                }, this);
            }
            else {
                Ext.Msg.alert("Demande refusée", "Votre demande de partage a été refusée", function(btnId) {
                  // this.fireEvent('decline');
                }, this);

            }
        }
    },

    onCardActivation: function() {
        console.log('onCardActivation', this, arguments);
        this.setLoading(false);
    },

    onDecline: function() {
        this.setActiveCard( this.getForm() );
    },

    onAccept: function(data) {
        console.warn("onAccept", this, arguments);
        var card = this.setActiveCard( this.getMap(data) );
        // card.on('activated', function() {
        //     console.log("ACTIVATION", this, arguments);
        //     card.dockedItems.first().update(data.description);
        //     card.dockedItems.last().update(data.time);
        // });
        // card.dockedItems
        // this.dockedItems.getAt(1).show();
    },
 

    afterRender: function() {
        Cab.master.Layout.superclass.afterRender.apply(this, arguments);
        Cab.utils.removeLoadMask();
    },

    onLoginTap: function() {
        console.log("onLoginTap", this, arguments);
        this.setActiveCard(this.getForm());
    },

    onBackTap: function(btn) {
        console.log('onBackTap', this, arguments);

        var anim = !btn.keepValues ? 'fade' : {type: 'slide', direction: 'right'};

        var card = this.setActiveCard(this.getForm(), anim);
        if (!btn.keepValues) card.reset();
        Cab.utils.stopPolling();
        this.hideBack();

        if (btn.keepValues) {
            // var record = list.store.getAt(index);
            // var card = this.setActiveCard(this.getForm(), {type: 'slide', direction: 'right'});
            // var row = card.list.store.getAt(0);
            // console.log("onDepartureListItemTap", record, row);
            // row.set('value', record.get('id'));
            // row.set('displayValue', record.get('name'));
            // this.showBack();
        } else {
            // var card = this.setActiveCard(this.getForm());
            // card.reset();
            // Cab.utils.stopPolling();
            // this.hideBack();
        }
    },

    onGoTap: function() {
        console.log('onGoTap', this, arguments);
        var self = this,
            card = this.getActiveItem(),
            params = card.getValues();

        console.warn("go", params, isNaN(params.arrival), isNaN(params.departure), !params.description, !params.description.length, !params.time, !params.time.length);

        if (
            isNaN(params.arrival)
            || isNaN(params.departure)
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
        var apparel = values.cloth + ' ' + values.color;
        card.list.store.getAt(3).set('value', apparel);
        card.list.store.getAt(3).set('displayValue', apparel);
    },

    onDepartureTap: function() {
        console.log('departureTap', this, arguments);
        var card = this.setActiveCard('departure_list', 'slide');
        card.on('itemTap', this.onDepartureListItemTap, this, {single: true});
        this.showBack(true);
    },

    onDepartureListItemTap: function(list, index) {
        var record = list.store.getAt(index);
        var card = this.setActiveCard(this.getForm(), {type: 'slide', direction: 'right'});
        var row = card.list.store.getAt(0);
        console.log("onDepartureListItemTap", record, row);
        row.set('value', record.get('id'));
        row.set('displayValue', record.get('name'));
        this.hideBack();
    },

    onArrivalTap: function() {
        console.log('onArrivalTap', this, arguments);
        var card = this.setActiveCard('arrival_list', 'slide');
        card.on('itemTap', this.onArrivalListItemTap, this, {single: true});
        this.showBack(true);
    },

    onArrivalListItemTap: function(list, index) {
        console.log('onArrivalListItemTap', this, arguments);
        var record = list.store.getAt(index);
        var card = this.setActiveCard(this.getForm(), {type: 'slide', direction: 'right'});
        var row = card.list.store.getAt(1);
        row.set('value', record.get('id'));
        row.set('displayValue', record.get('name'));
        this.hideBack();
    },

    onRidesItemTap: function(list, index) {
        console.log('onRidesItemTap', this, arguments);  
    },

    showBack: function(keepValues) {
        console.log('showBack', this, arguments, this.dockedItems);
        var button = this.dockedItems.first().items.first();
        button.show();
        button.keepValues = keepValues;
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

    getMap: function(data) {
        console.log("getMap", this, arguments);
        return {
            xtype: 'mapcontainer',
            infoData: data
        };
    }

});

Ext.reg('master', Cab.master.Layout);