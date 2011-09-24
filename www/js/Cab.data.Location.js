Ext.ns('Cab.data');

Ext.regModel('Location', {
    fields: [
        {name: 'label'},
        {name: 'lat'},
        {name: 'lng'}
    ]
});

Cab.data.Location = new Ext.data.Store({
    model: 'Location',
    data: [
        {label:"Opéra Bastille", lat:48.853986, lng:2.369957},
        {label:"Aéroport Orly", lat:48.729134, lng:2.369099},
        {label:"Place d'Italie", lat:48.831758, lng:2.355988},
        {label:"Place de la République", lat:48.867354, lng:2.363927},
        {label:"Métro Montmartre", lat:48.884586, lng:2.345238},
        {label:"Place Daumesnil", lat:48.846869, lng:2.376051},
        {label:"Place Vendôme", lat:48.867481, lng:2.329209},
        {label:"Gare de Lyon", lat:48.844723, lng:2.373862},
        {label:"Gare Montparnasse", lat:48.840797, lng:2.319467},
        {label:"Parc des expositions Villepinte", lat:48.973781, lng:2.514839}
    ]
});
