Ext.define('myApp.controller.GoogleMap', {
    extend: 'Ext.app.Controller',

    config: {
        stores: ['HuntsStore', 'GoogleMapStore'],
    },

    //called when the Application is launched, remove if not needed
    launch: function() {
        console.log('im in google controller')
    },

    map_render: function(comp, map, record) {
        console.log("map rendered");

        var stationsStore = Ext.getStore('GoogleMapStore');
        var proxy= stationsStore.getProxy();
        proxy.setExtraParam('huntID', record.get('id') );


        stationsStore.load({
            callback: function(markerRecords){
                var data = markerRecords[0].getData(); //Get the data from the record
                console.log(data['lat']);
            }
        });

        /*
        var lmao = Ext.getStore('GoogleMapStore').
            store.each(function(record){
                console.log(record.get('media_id'));
            });

        */

        //var test = stationsStore.getById('id');
        //console.log(record);

       // var data = stationsStore.getData();
        //var lolRecord = data.getAt(0); // get first record of store

        //console.log(lolRecord.get('resultText')); // get value of the resultText field

        //stationsStore.data.size

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
    }

});