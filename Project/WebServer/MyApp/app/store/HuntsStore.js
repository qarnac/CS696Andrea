Ext.define('myApp.store.HuntsStore', {
	extend: 'Ext.data.Store',
	
	requires: [
		'myApp.model.Hunt'
	],
	
	config: {
		autoload: true,
		model: 'myApp.model.Hunt',
		storeId: 'issuestores',
		
		proxy: {
			type: 'ajax',
			url: 'http://localhost:8080/test.xml',
			reader: {
                    type: 'xml',
					rootProperty: 'Issue',
					record: 'Issue'
            }
		}
	}
});