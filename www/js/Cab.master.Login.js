Ext.ns('Cab.master');

Cab.master.Login = Ext.extend(Ext.Container, {

    initComponent: function() {

        Ext.apply(this, {
            html: 'login'
        });

        Cab.master.Login.superclass.initComponent.apply(this, arguments);

    }

});

Ext.reg('login', Cab.master.Login);