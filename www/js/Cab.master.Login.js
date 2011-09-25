Ext.ns('Cab.master');

Cab.master.Login = Ext.extend(Ext.Container, {

    initComponent: function() {

        Ext.apply(this, {
            html: 'landing page!<br />TODO: Build a landing page to detail test scenario for app testers.<br /><br /> <i>tap on it to make it vanish...</i>'
        });

        Cab.master.Login.superclass.initComponent.apply(this, arguments);

        Cab.data.Rides.on('load', this.onRidesLoad, this);

    }

});

Ext.reg('login', Cab.master.Login);