Ext.ns('Cab.data');

Ext.regModel('Location', {
    fields: [
        {name: 'name'},
        {name: 'lat'},
        {name: 'lng'},
        {name: 'id'}
    ]
});

Cab.data.Location = new Ext.data.Store({
    model: 'Location',
    autoLoad: true,
    proxy: {
        type: 'scripttag',
        reader: {type: 'json'},
        url: API_URL + 'places/index.json'
    }
    // data: [
    //     {name:"Opéra Bastille", lat:48.853986, lng:2.369957, id: 42},
    //     {name:"Aéroport Orly", lat:48.729134, lng:2.369099, id: 42},
    //     {name:"Place d'Italie", lat:48.831758, lng:2.355988, id: 42},
    //     {name:"Place de la République", lat:48.867354, lng:2.363927, id: 42},
    //     {name:"Métro Montmartre", lat:48.884586, lng:2.345238, id: 42},
    //     {name:"Place Daumesnil", lat:48.846869, lng:2.376051, id: 42},
    //     {name:"Place Vendôme", lat:48.867481, lng:2.329209, id: 42},
    //     {name:"Gare de Lyon", lat:48.844723, lng:2.373862, id: 42},
    //     {name:"Gare Montparnasse", lat:48.840797, lng:2.319467, id: 42},
    //     {name:"Parc des expositions Villepinte", lat:48.973781, lng:2.514839, id: 42}
    // ]
});
