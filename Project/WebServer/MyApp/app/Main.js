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
			imageList: '#imagelist'
        },
        control: {
            'hunts list':{
				itemtap: 'showPost'
			}
        }
    },
	
	showPost: function(list, index, element, record){
		console.log('Item tapped');
		
		this.getBlog().push({
			xtype: 'panel',
			title: record.get('id'),
			html: record.get('latitude'), 
			scrollable: true,
			styleHtmlContent: true
		});
	},
	
	onImgListItemTap: function(dataview, index, target, record, e, options) {
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
		
	},
	
	/*
	onImgListItemTap: function(dataview, index, target, record, e, options) {
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
        */
		/*
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
		
    }
	*/
	
	

});
