Ext.define('myApp.view.GoogleMap', {
    extend: 'Ext.Map',
	xtype: 'map',
	layout: 'fit',
	
	config:{
		title:'Map',
		iconCls: 'action',
		useCurrentLocation:true,
		
		mapOptions: {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 15,
			navigationControl: true,
		},
		
		listeners: {
            maprender: function() {
                var gMap = this.getMap();

                new google.maps.Marker({
                    map: gMap,
                    animation: google.maps.Animation.DROP,
					title: "test",
                });

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
				
            }
        } //end listener
	},
	
});