Ext.define('myApp.model.Hunt',{
	extend: 'Ext.data.Model',
	
	uses:[
		'myApp.model.Section'
	]
	
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
        hasMany: {
            associationKey: 'Sections',
            model: 'myApp.model.Section',
            name: 'section'
        }
    }
	
});