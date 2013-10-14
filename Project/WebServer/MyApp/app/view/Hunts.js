Ext.define('myApp.view.Hunts', {
	extend: 'Ext.navigation.View',
	xtype: 'hunts',
	
	requires: ['Ext.data.reader.Xml'],
	
	config:{
		title:'Hunts',
		iconCls: 'home',
		itemTpl: '{user}',
		
		/*
		items: {
			xtype: 'list',
			itemTpl: '{id}',
			title: 'Recent Posts',
		}
		*/
	
		items: {
			xtype: 'list',
			itemTpl: '{user}',
			title: 'Recent Posts',
			
			store: {
				autoLoad: true,
				fields: ['user'],
				
				//proxy tells how to load the data
				proxy: {
					type: 'ajax',							//checked
					url: 'http://localhost:8080/test.xml', //checked
					
                    reader: {
                        type: 'xml',
						rootProperty: 'users',
					}
				}
			}
		}
	
		
	}

});