Ext.define('myApp.view.GoogleMap', {
    extend: 'Ext.Map',
	xtype: 'map',
	layout: 'fit',
	
	
	mapMarkers : [], // store all markers
	
	config:{
		title:'Map',
		iconCls: 'action',
		useCurrentLocation:true,
		itemId: 'mapbox',

		mapOptions: {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 15,
			navigationControl: true,
		},
		
		listeners: {
            maprender: function() {
                var gMap = this.getMap();
            }
        } //end listener
	},
	
});