Ext.define('myApp.controller.Hunts', {
    extend: 'Ext.app.Controller',

    config: {
        stores : ['HuntsStore'],
        models : ['Hunt'],

        refs: {
            blog: 'hunts'
        },
        control: {
            'hunts list':{
                itemtap: 'showPost'
            }
        },

    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
            console.log('Hi!!!!!');
    },

    passVariableToPHP: function(idNumber) {
        console.log(idNumber);
        window.location.href = "queryMarkerForMap.php?w1=hello";
    },

    showPost: function(list, index, element, record){
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

                    //var arrayOfStrings = record.get('markers');
                    passVariableToPhp


                }

            }

        });
    }

});