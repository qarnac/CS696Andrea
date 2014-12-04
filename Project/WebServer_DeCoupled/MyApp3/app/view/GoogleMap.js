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
        autoUpdate: true,
        frequency: '5000',

        store: 'GoogleMapStore',

		mapOptions: {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 15,
			navigationControl: true
		},

        listeners: {
            maprender : function(comp, map) {


                var geo = Ext.create('Ext.util.Geolocation', {
                    autoUpdate: false,
                    listeners: {
                        locationupdate: function(geo) {
                            var currentLat = geo.getLatitude();
                            var currentLng =  geo.getLongitude();
                            var altitude = geo.getAltitude();
                            var speed = geo.getSpeed();
                            var heading= geo.getHeading();

                            new google.maps.Marker({
                                map       : map,
                                position  : new google.maps.LatLng(currentLat, currentLng),
                                title     : 'Drag Marker To New Position'
                            });
                        },
                        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                            if(bTimeout)
                                Ext.Msg.alert('Timeout occurred',"Could not get current position");
                            else
                                alert('Error occurred.');
                        }
                    }
                });

                geo.updateLocation();


            }

        }

    }


});

