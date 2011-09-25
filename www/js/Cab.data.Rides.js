Ext.ns('Cab.data');

Ext.regModel('Rides', {
    fields: [
        {name: 'end'},
        {name: 'start'},
        {name: 'time'},
        {name: 'tripId'},
        {name: 'userId'},
        {name: 'selected'}
    ]
});

Cab.data.Rides = new Ext.data.Store({
    model: 'Rides',
    proxy: {
        type: 'scripttag',
        url: API_URL + 'trips/polling',
        reader: {
            type: 'json',
            root: 'rides'
        }
    },
    listeners: {
        load: function(store, records, success) {

            console.log('POLL LOAD', arguments);
            var data = store.proxy.reader.rawData;
            if (data.request) {
                // received a share request
                console.log('received a request', data.request);
                // Confirmation alert
                Ext.Msg.confirm("Nouvelle demande de partage", "Souhaitez vous partager votre taxi?", function(btnId) {
                    console.log('MESSAGE', arguments);
                    
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
                        this.fireEvent('decline');
                    } else {
                        this.fireEvent('accept', this);
                    }

                }, this);
            }
            if (data.response) {
                // received a share request response
                console.log('received a response', data.response);
                if (data.response.success) {
                    Ext.Msg.alert("Demande acceptée", "Votre demande de partage a été acceptée", function(btnId) {
                        console.warn("DEMAND RESPONSE", btnId);
                         if (btnId === 'ok') {
                             this.fireEvent('accept', this);
                         }
                    }, this);
                }
                else {
                    Ext.Msg.alert("Demande refusée", "Votre demande de partage a été refusée", function(btnId) {
                       this.fireEvent('decline');
                    }, this);

                }
            }
        }
    }
});
