Ext.define('myApp.view.Hunts', {
	extend: 'Ext.navigation.View',
	
	requires: [
		'Ext.data.proxy.*',
		'Ext.dataview.List',
		'Ext.data.reader.Reader',
        'Ext.data.Store',
        'Ext.data.proxy.JsonP',
	],
	
	xtype: 'huntspanel',

	config:{
		title:'Hunt',
		iconCls: 'home',

        // controllers:['Hunt'],
        // store : 'myApp.store.HuntsStore',

        items:[{
			xtype: 'list',
			title: 'Scavenger Hunt',
			itemTpl: '{title}',

            //store: 'HuntsStore'
            /*
			store: {
				autoLoad: true,
				fields: ['id','title','latitude','longitude','min_lat','min_lng','max_lat','max_lng'],

				//proxy tells how to load the data
				proxy: {
					type: 'ajax',
					//force to use method get
					useDefaultXhrHeader: false,
					url: 'http://southsuco.com/MyApp/php/HomeDisplayHunt.php',

                    reader: {
                        type: 'xml',
						contentType: "text/XML;",
                        rootProperty: 'hunts',
						record: 'hunt'
					}
				}
			}*/
		}]

	}
});