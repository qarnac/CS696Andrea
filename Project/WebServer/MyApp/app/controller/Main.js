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
            blog: 'hunts'
        },
        control: {
            'hunts list':{
				itemtap: 'showPost'
			}
        }
    },


	showPost: function(list, index, element, record){
		console.log('Item tapped');
		var me = this.getBlog();

		this.getBlog().push({
			xtype: 'map',
			title: record.get('title'),
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
                        title: record.get('title'),
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

                    function attachSecretMessage(map, marker, number) {
                        google.maps.event.addListener(marker, 'click', function()
                        {
                            console.log('clicked!');

                            var str = record.get('question');
                            var res = str.replace('"questiona"','');
                            res = res.replace('"questionb"','');
                            res = res.replace('"questionc"','');
                            res = res.replace('"questiond"','');
                            res = res.replace('{','');
                            res = res.replace('}','');
                            res = res.split(":");


                            var result = "";
                            for (var i = 0; i < res.length; i++) {
                               // if((i % 2) != 0)
                                res[i] = res[i].replace("\"",'');
                                res[i] = res[i].replace("?\"",'?');
                                res[i] = res[i].replace(',','');

                                result += res[i] + "<br/><br/>" ;
                            }

                            me.push({
                                title: 'questions',
                                html: result
                            });

                        });
                    }

                    attachSecretMessage(map, marker, 1);
                }
				
            }
		
		});
	}
});
