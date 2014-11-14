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

    },

    listeners: {
        maprender : function(comp, map) {
            var geo = comp.getGeo();

            new google.maps.Marker({
                map       : this.getMap(),
                position  : new google.maps.LatLng(geo.getLatitude(), geo.getLongitude()),
                title     : 'Drag Marker To New Position',
                animation : google.maps.Animation.DROP,
                draggable : true
            });
        },

        locationupdate: function(geo) {
            latitude=Global.currentUserLocations.currentLat;
            longitude=Global.currentUserLocations.currentLong;
            if(Global.currentUserPositionMarker)
            {
                latlng1=new google.maps.LatLng(latitude, longitude);
                Global.currentUserPositionMarker.setPosition(latlng1);
            }
        }

    }

    /*
    // remove all markers
    clearMarkers: function() {
        for (var i=0; i<this.mapMarkers.length; i++) {
            this.mapMarkers[i].setMap(null);
        }
        this.mapMarkers = new Array();
    },

    initialize: function() {
        var gMap = this.getMap();


        var geocoder = new google.maps.Geocoder();

        if(google.loader.ClientLocation) {
             var lat =  google.loader.ClientLocation.latitude;
             var lng  = google.loader.ClientLocation.longitude;

            // drop map marker
            var marker = new google.maps.Marker({
                map: gMap,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng (lat,lng),
                //icon: 'resources/images/jogging.png'
            });

        }


        // remove all markers after 5 seconds
        Ext.Function.defer(this.clearMarkers,5000,this);
    }
    */


});

