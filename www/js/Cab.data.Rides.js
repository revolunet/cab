Ext.ns('Cab.data');

Ext.regModel('Rides', {
    fields: [
        {name: 'end'},
        {name: 'start'},
        {name: 'time'},
        {name: 'tripId'},
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
                    Ext.Ajax.request({
                        url: API_URL + 'confirm',
                        method:'GET',
                        params: {
                            userId: Cab.utils.userId,
                            passengerId:data.request.userId,
                            tripId:data.request.tripId,
                            value:(btnId == 'ok')
                        },
                        success: function(response, opts) {  },
                        failure: function(response, opts) {  }
                    });
                     
                });
            }
            if (data.response) {
                // received a share request response
                console.log('received a response', data.response);
                if (data.response.success) {
                    Ext.Msg.confirm("Demande acceptée", "Votre demande de partage a été acceptée", function(btnId) {});
                }
                else {
                    Ext.Msg.confirm("Demande refusée", "Votre demande de partage a été refusée", function(btnId) {});
                }
            }
        }
    }
});
