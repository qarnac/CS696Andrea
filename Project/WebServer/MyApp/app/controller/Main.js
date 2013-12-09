Ext.define('myApp.controller.Main', {
    extend: 'Ext.app.Controller',
	
	requires: [
        'myApp.view.Main',
        'myApp.view.GoogleMap',    
        'Ext.Map',
        'Ext.TitleBar',
        'Ext.field.Slider'
    ],

    config: {
        refs: {
            blog: 'hunts',
        },
        control: {
            'hunts list':{
				itemtap: 'showPost'
			}
        }
    },
	
	attachSecretMessage: function(map, marker, number) {
		console.log("test");
		var message = ["This","is","the","secret","message"];
		var infowindow = new google.maps.InfoWindow(
		{ 
			content: message[number],
			size: new google.maps.Size(50,50)
		});
			
		google.maps.event.addListener(marker, 'click', function() 
		{
			console.log('clicked!');
			//infowindow.open(map,marker);
		});
	},
	
	showPost: function(list, index, element, record){
		console.log('Item tapped');
		var me = this;
		
		//var infowindow = new google.maps.InfoWindow({
		//	content: 'prova'
		//});
		this.getBlog().push({
			xtype: 'map',
			title: record.get('id'),
			fullscreen: true,
			layout:'fit',
			//added comment test
			useCurrentLocation: false,
			listeners: {				
				maprender: function(comp, map) {
					
					var lat = parseFloat(record.get('latitude'));
					var longi = parseFloat(record.get('longitude'));
					var minLat = parseFloat(record.get('min_lat'));
					var minLng = parseFloat(record.get('min_lng'));
					var maxLat = parseFloat(record.get('max_lat'));
					var maxLng = parseFloat(record.get('max_lng'));
				
//					var spanX   = (maxLat - minLat) * 1.1;
//					var spanY   = (maxLng - minLng) * 1.1;
					var centerX = (minLat + maxLat) / 2;
					var centerY = (minLng + maxLng) / 2;
					
					var southWest = new google.maps.LatLng(minLat,minLng);
					var northEast = new google.maps.LatLng(maxLat,maxLng);
					var bounds = new google.maps.LatLngBounds(southWest,northEast);

					
					var position = new google.maps.LatLng(
						lat, 
						longi
					); 
					
					var marker = new google.maps.Marker({
						position: position,
						map: map,
						title: record.get('id'),
						animation: google.maps.Animation.DROP,
					});
					
					var rectangle = new google.maps.Rectangle({
						strokeColor: '#FF0000',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#FF0000',
						fillOpacity: 0.35,
						map: map,
						bounds: new google.maps.LatLngBounds(
						  new google.maps.LatLng(minLat, minLng),
						  new google.maps.LatLng(maxLat, maxLng))
					});
					
					var panningPoint = new google.maps.LatLng(centerX, centerY);
					
				    map.fitBounds(bounds);
					map.panTo(panningPoint);
					map.setZoom(map.getZoom());
					
					attachSecretMessage(map, marker, 1);
                },
				
            }
		
		});
			
		//var map = Ext.ComponentQuery.query('map');
/*
		var map = new Ext.Map({
        title: 'Map',
        useCurrentLocation: true,
        mapOptions: {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(record.data.latitude, record.data.longitude),
            mapTypeControl: false,
            zoomControl: true,
            overviewMapControl: false,
            panControl: false,
            rotateControl: false,
            scaleControl: false,
            controlPosition: false,
            navigationControl: false,
            streetViewControl: false,
            backgroundColor: 'transparent',
            disableDoubleClickZoom: true,
            zoom: 15,
            keyboardShortcuts: false,
            scrollwheel: false
			}
		});
		*/
		
		// drop map marker
		/*
		console.log(record.get('latitude'));
		console.log(record.get('longitude'));
		var lat = parseFloat(record.get('latitude'));
		var longi = parseFloat(record.get('latitude'));
		
		 
		var marker = new google.maps.Marker({
			map: map.map,
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng (lat,longi),
			title:"Hello World!"
		}); 
		 
		marker.setMap(map);
		*/
		//); 
	},
	

	
	

});
