Ext.define('myApp.model.Hunt',{
	extend: 'Ext.data.Model',
	
	uses:[
		'myApp.model.Section'
	],
	
    config: {
        fields: [
            {
                name: 'IssueId'
            },
            {
                name: 'Name'
            },
            {
                name: 'PublicationDate'
            }
        ],
        associations: [ {
            type: 'hasMany',
            model: 'MyApp.model.Floorplan',
            associationKey: 'floorplans'
        }
    }
	
});