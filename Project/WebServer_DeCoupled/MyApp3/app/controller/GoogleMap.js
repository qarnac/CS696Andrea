Ext.define('myApp.controller.Hunts', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            blog: 'hunts'
        },
        control: {
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {
    },

    showMap: function(list, index, element, record){
        console.log('Item tapped');
        var me = this.getBlog();

        this.getBlog().push({
            title: record.get('title'),
            fullscreen: true,
            layout:'fit',
            //added comment test
            useCurrentLocation: false,
            listeners: {
                maprender: function(comp, map) {

                    var southWest = new google.maps.LatLng(minLat,minLng);
                    var northEast = new google.maps.LatLng(maxLat,maxLng);
                    var bounds = new google.maps.LatLngBounds(southWest,northEast);

                    var position = new google.maps.LatLng(
                        lat,
                        longi
                    );

                    var arrayOfStrings = record.get('markers');


                }

            }

        });
    }

});