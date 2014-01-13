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
				/*
				var marker = new google.maps.Marker({
					map: gMap,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng (12.82787,80.219722),
					title:"Hello World!"
				});
				*/
				
				/*
                var geo = Ext.create('Ext.util.Geolocation', {
                    autoUpdate: true,
                    listeners: {
                        locationupdate: function(geo) {
                            var center = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
                            //Ext.getCmp('geomap').setMapCenter(center); // obselete?
					
							
                            var marker = new google.maps.Marker({
                                position: center,
                                map: gMap
                            });
							
							setInterval(function(){marker.setMap(null);},4000);
                        }
                    }
                });
                geo.updateLocation();
				*/
				
            }
        } //end listener
	},
	
});