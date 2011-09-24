Ext.ns('Cab.utils');

Cab.utils = {

    removeLoadMask: function() {
        var el = Ext.getBody().down('.loadmask');

        if (el) Ext.Anim.run(el, 'fade', {
            after: Ext.createDelegate(el.remove, el)
        });
    }
};