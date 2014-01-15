Ext.define('myApp.model.Hunt',{
    extend: 'Ext.data.Model',

    uses:[
        'myApp.model.Section'
    ],

    config: {
        fields: [
            'id',
            'lat',
            'lng',
            'media_id'
        ]
    }

});