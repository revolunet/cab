Ext.ns('Cab.master');

Cab.master.Login = Ext.extend(Ext.Container, {

    initComponent: function() {

        Ext.apply(this, {
            scroll: 'vertical',
            html: '<img src="img/landing_page.png" />',
            // bodyCls: 'login-panel'
            // html: 'landing page!<br />TODO: Build a landing page to detail test scenario for app testers.<br /><br /> <i>tap on it to make it vanish...</i>'
        });

        Cab.master.Login.superclass.initComponent.apply(this, arguments);

    }

});

Ext.reg('login', Cab.master.Login);