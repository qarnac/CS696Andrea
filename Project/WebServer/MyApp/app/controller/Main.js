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
	
	showPost: function(list, index, element, record){
		console.log('Item tapped');
		
		var me = this;
		
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
					
					console.log(lat);
					console.log(longi);
					
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
					
					map.panTo(marker.getPosition());
					
                }
            }
		
			/*
			items:[
				{
					xtype:'map',
					useCurrentLocation:false,
				}
			]
			*/
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
	
	/*
		console.log('Item tapped');
		var data = record.data;
		var pos = new google.maps.LatLng(data.lat, data.long);
        var zoomlevel = data.zoom;
        var imgTiles = new google.maps.ImageMapType({
			getTileUrl: function(coord, zoom) {
				return data.url
			},
			tileSize: new google.maps.Size(256, 256),
			isPng: true,
			opacity: 1.0
        });
		console.log('Item tapped');
		var mapView = Ext.create('Ext.Map', {
            mapOptions : {
                center : pos,
                zoom : zoomlevel,
                tilt: 0,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT,
                    style: google.maps.ZoomControlStyle.SMALL
                },
                streetViewControl: false,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },
            listeners: {
                delay: 500,
                maprender: function(comp, map){                            
                                map.overlayMapTypes.insertAt(0, imgTiles);
                }
            }
        });
		
    
        var mapPanel = Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: 'fit',
            items: [{
                xtype: 'titlebar',
                docked: 'top',
                title: 'Map',
                items: [{
                    xtype: 'button',
                    text: 'Back',
                    ui: 'back',
                    handler: function () {
                            Ext.Viewport.setActiveItem(0, {type: 'slide', direction: 'right'});
                        }
                }]
                },mapView]
        });
		
        Ext.Viewport.animateActiveItem(mapPanel, {type: 'slide', direction: 'left'})
	*/	
	

});
