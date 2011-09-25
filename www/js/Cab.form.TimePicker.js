Ext.ns('Cab.form');

Cab.form.TimePicker = Ext.extend(Ext.Picker, {
    slots: [{
        name : 'hours',
        title: 'Hours',
        data : function() {
            var data = [];
            for (var i = 0; i < 24; i++) {
                if (i < 10) i = '0' + i;
                data.push({text: i, value: i});
            }
            return data;
        }()
    }, {
        name : 'minutes',
        title: 'Minutes',
        data : function() {
            var data = [];
            for (var i = 0; i < 60; i++) {
                if (i < 10) i = '0' + i;
                data.push({text: i, value: i});
            }
            return data;
        }()
    }]
});
