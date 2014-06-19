Ext.define('myApp.view.GoogleMap', {
    extend: 'Ext.Map',

	xtype: 'map',
	layout: 'fit',

    requires: ['myApp.store.GoogleMapStore',
               'Ext.util.Geolocation'],
	
	config:{
		title:'Map',
		iconCls: 'action',
		useCurrentLocation: true,
		itemId: 'mapbox',

        store: 'GoogleMapStore',

		mapOptions: {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 15,
			navigationControl: true
		}

    }

});

