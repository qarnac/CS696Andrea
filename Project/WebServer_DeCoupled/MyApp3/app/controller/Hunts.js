Ext.define('myApp.controller.Hunts', {
    extend: 'Ext.app.Controller',

    config: {
       // models : ['myApp.model.Hunt'],
       // stores : ['myApp.store.HuntsStore'],
       // views  : ['myApp.view.Hunts'],

        refs: {
            // We're going to lookup views by xtype
            blog: 'huntspanel'
        },
        control: {
            // The commands fired by the hunt list
            'huntspanel list':{
                itemtap: 'showPost'
            }
        }

    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {
       // var controllerTest = this.getApplication().getController('GoogleMap');
       console.log("in launch");
    },

    showPost: function(list,index,element,record){
        console.log('Hi Debug');
        var me = this.getBlog();
        me.push({
            xtype: 'map',
            title: record.get('title'),
            fullscreen: true,
            layout:'fit',

            useCurrentLocation: false,

            listeners: {
                'maprender' : function(comp, map){

                    window['myApp'].app.getController('GoogleMap').map_render(comp, map, record);

                }
            }


        });
    }


    /*
    showPost: function(list, index, element, record){
        console.log('Item tapped');
        var me = this.getBlog();

        //Ext.getApplication().getController('Controllername');

        this.getBlog().push({
            xtype: 'map',       //grap the xtype and use it from google map
            title: record.get('title'),
            fullscreen: true,
            layout:'fit',
            //added comment test
            useCurrentLocation: false,
            listeners: {
                mapRender: function(comp, map) {


                    var minLat = parseFloat(record.get('min_lat'));
                    var minLng = parseFloat(record.get('min_lng'));
                    var maxLat = parseFloat(record.get('max_lat'));
                    var maxLng = parseFloat(record.get('max_lng'));

                    var centerX = (minLat + maxLat) / 2;
                    var centerY = (minLng + maxLng) / 2;

                    var lat = parseFloat(record.get('latitude'));
                    var longi = parseFloat(record.get('longitude'));

                    var southWest = new google.maps.LatLng(minLat, minLng);
                    var northEast = new google.maps.LatLng(maxLat, maxLng);
                    var bounds = new google.maps.LatLngBounds(southWest, northEast);

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

                    var summaryDataStore = Ext.getStore('myApp.store.GoogleMapStore');
                    summaryDataStore.load();
                    console.log(summaryDataStore.getCount());

                    function attachSecretMessage(map, marker, number) {
                        google.maps.event.addListener(marker, 'click', function()
                        {
                            console.log('clicked!');

                            var contentQuestions = record.get('question');
                            var result = JSON.parse(contentQuestions);

                            me.push({
                                title: 'questions',
                                html: result.questiona + '<br/>' + result.questionb + '<br/>' + result.questionc,
                            });

                        });
                    }

                    //attachSecretMessage(map, marker, 1);
                }
            }

        });
    }
    */

});