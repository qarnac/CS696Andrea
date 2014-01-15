Ext.define('myApp.model.Hunt',{
	extend: 'Ext.data.Model',
	
	uses:[
		'myApp.model.Section'
	],

    config: {
        fields: [
            'id',
            'title',
            'latitude',
            'longitude',
            'min_lat',
            'min_lng',
            'max_lat',
            'max_lng'
        ]
    }

});