Ext.define('myApp.view.Hunts', {
	extend: 'Ext.navigation.View',
	
	requires: [
		'Ext.data.proxy.*',
		'Ext.dataview.List',
		'Ext.data.Model',
	],
	
	xtype: 'hunts',
	
	config:{
		title:'Hunt',
		iconCls: 'home',

		items:[{
			xtype: 'list',
			title: 'Scavenger Hunt',
			itemTpl: '{id}',
			
			store: {
				autoLoad: true,
				fields: ['id'],
				
				//proxy tells how to load the data
				proxy: {
					type: 'ajax',
					
					//force to use method get
					useDefaultXhrHeader: false,
	
					url: 'http://southsuco.com/apiCyberScavenger.php',
					
                    reader: {
                        type: 'xml',
						contentType: "text/XML;",
                        rootProperty: 'users',
						record: 'user'
					}
				}
			}
			
			
		}]
	}
});