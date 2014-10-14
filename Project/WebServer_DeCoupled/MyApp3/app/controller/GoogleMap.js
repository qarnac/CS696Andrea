Ext.define('myApp.controller.GoogleMap', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            // We're going to lookup views by xtype
            blog: 'huntspanel'
        },
        stores: ['HuntsStore', 'GoogleMapStore'],
    },

    //called when the Application is launched, remove if not needed
    launch: function() {
        console.log('im in google controller')
    },

    drawRectangle: function (map, minLat, minLng, maxLat, maxLng) {
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
    },

    setFocus: function (centerX, centerY, map, bounds) {
        var panningPoint = new google.maps.LatLng(centerX, centerY);

        map.fitBounds(bounds);
        map.panTo(panningPoint);
        map.setZoom(map.getZoom());
    },

    map_render: function(comp, map, record) {
        console.log("map rendered");

        var stationsStore = Ext.getStore('GoogleMapStore');
        var proxy = stationsStore.getProxy();
        proxy.setExtraParam('huntID', record.get('id') );
        var currentActivity = this.getBlog();

        var minLat = parseFloat(record.get('min_lat'));
        var minLng = parseFloat(record.get('min_lng'));
        var maxLat = parseFloat(record.get('max_lat'));
        var maxLng = parseFloat(record.get('max_lng'));

        var questions = record.get('questions');

        var centerX = (minLat + maxLat) / 2;
        var centerY = (minLng + maxLng) / 2;

        var lat = parseFloat(record.get('latitude'));
        var longi = parseFloat(record.get('longitude'));

        var southWest = new google.maps.LatLng(minLat, minLng);
        var northEast = new google.maps.LatLng(maxLat, maxLng);
        var bounds = new google.maps.LatLngBounds(southWest, northEast);

        this.drawRectangle(map, minLat, minLng, maxLat, maxLng);

        this.setFocus(centerX, centerY, map, bounds);

        function addMarkerPositions(markerRecords) {
            var jsonQuestions = JSON.parse(questions);

            for (var i = 0; i < markerRecords.length; ++i) {
                var data = markerRecords[i].getData(); //Get the data from the record

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data['lat'], data['lng']),
                    map: map,
                    customInfo : data["additionalAnswers"],
                    mediaId: data['media_id']
                });

                google.maps.event.addListener(marker, 'click', function()
                {
                    var jsonResults  = JSON.parse(this.customInfo);
                    var mediaID = this.mediaId;
                    var jsonMultipleQsAnswers  = JSON.parse(data['choices']);

                    currentActivity.push({xtype:'huntinfopanel'});

                    Ext.getCmp('q1info').setLabel(jsonQuestions.questiona);
                    Ext.getCmp('q2info').setLabel(jsonQuestions.questionb);
                    Ext.getCmp('q3info').setLabel(jsonQuestions.questionc);


                    console.log(data['partner_names']);
                    console.log(data['interestingurl']);

                    Ext.ComponentQuery.query('#partnersinfo')[0].setValue(data['partner_names']);
                    Ext.ComponentQuery.query('#urlinfo')[0].setValue(data['interesting_url']);
                    Ext.ComponentQuery.query('#q1info')[0].setValue(jsonResults.answera);
                    Ext.ComponentQuery.query('#q2info')[0].setValue(jsonResults.answerb);
                    Ext.ComponentQuery.query('#q3info')[0].setValue(jsonResults.answerc);
                    Ext.ComponentQuery.query('#multiplechoicequestion')[0].setValue(data['multiple_question']);


                    console.log(jsonMultipleQsAnswers.choices);
                    console.log(jsonMultipleQsAnswers.choices[0].content);

                    Ext.getCmp('answera1').setValue(jsonMultipleQsAnswers.choices[0].content);
                    console.log(Ext.getCmp('answera1'));
                    

                    var strNumber = String(this.mediaId);

                    var urlVar = './images/' + strNumber + '.jpeg';

                    Ext.ComponentQuery.query('#imageStuffId')[0].setSrc(urlVar);
                });

            }
        }

        stationsStore.load({
            callback: function(markerRecords){
                addMarkerPositions(markerRecords);
            }
        });

    }
});