Ext.ns('Cab.form');

Cab.form.ApparelPicker = Ext.extend(Ext.Picker, {
    slots: [{
        name : 'cloth',
        title: 'Cloth',
        data: clothesX
        // data : [
        //     {text: 'gloves', value: 'gloves'},
        //     {text: 'tshirt', value: 'tshirt'}
        // ]
    }, {
        name : 'color',
        title: 'Color',
        data : colorsX// [
        //             {text: 'red', value: 'red'},
        //             {text: 'green', value: 'green'}
        //         ]
    }]
});
