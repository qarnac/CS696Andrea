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

            function displayMultipleAnswers(jsonMultipleQsAnswers) {

                if( jsonMultipleQsAnswers.choices[0] === undefined ||  jsonMultipleQsAnswers.choices[0] === "")
                    Ext.ComponentQuery.query('#answera1')[0].hide();
                else
                {
                    console.log("answer multiple q answer a")
                    Ext.ComponentQuery.query('#answera1')[0].setLabel('a) ' + jsonMultipleQsAnswers.choices[0].content);
                    Ext.ComponentQuery.query('#answera1')[0].setValue(jsonMultipleQsAnswers.choices[0].ans);
                }

                if( jsonMultipleQsAnswers.choices[1] === undefined ||  jsonMultipleQsAnswers.choices[1] === "")
                    Ext.ComponentQuery.query('#answerb2')[0].hide();
                else{
                    console.log("answer multiple q answer b")
                    Ext.ComponentQuery.query('#answerb2')[0].setLabel('b) ' + jsonMultipleQsAnswers.choices[1].content);
                    Ext.ComponentQuery.query('#answerb2')[0].setValue(jsonMultipleQsAnswers.choices[1].ans);
                }
                if( jsonMultipleQsAnswers.choices[2] === undefined ||  jsonMultipleQsAnswers.choices[2] === "")
                    Ext.ComponentQuery.query('#answerc3')[0].hide();
                else{
                    console.log("answer multiple q answer c")
                    Ext.ComponentQuery.query('#answerc3')[0].setLabel('c) ' + jsonMultipleQsAnswers.choices[2].content);
                    Ext.ComponentQuery.query('#answerc3')[0].setValue(jsonMultipleQsAnswers.choices[2].ans);
                }
                if( jsonMultipleQsAnswers.choices[3] === undefined ||  jsonMultipleQsAnswers.choices[3] === "")
                    Ext.ComponentQuery.query('#answerd4')[0].hide();
                else{
                    console.log("answer multiple q answer d")
                    Ext.ComponentQuery.query('#answerd4')[0].setLabel('d) ' + jsonMultipleQsAnswers.choices[3].content);
                    Ext.ComponentQuery.query('#answerd4')[0].setValue(jsonMultipleQsAnswers.choices[3].ans);
                }

                if( jsonMultipleQsAnswers.choices[4] === undefined ||  jsonMultipleQsAnswers.choices[4] === "")
                    Ext.ComponentQuery.query('#answere5')[0].hide();
                else
                {
                    console.log("answer multiple q answer e")
                    Ext.ComponentQuery.query('#answere5')[0].setLabel('e) ' + jsonMultipleQsAnswers.choices[4].content);
                    Ext.ComponentQuery.query('#answere5')[0].setValue(jsonMultipleQsAnswers.choices[4].ans);
                }

            }

            function displayQuestionInformations(jsonResults, jsonMultipleQsAnswers) {

                if(this.partnerNames === undefined || this.partnerName === "")
                    Ext.ComponentQuery.query('#partnersinfo')[0].hide();
                else
                    Ext.ComponentQuery.query('#partnersinfo')[0].setValue(this.partnerNames);

                if(this.interestingUrl === undefined || this.interestingUr === "")
                    Ext.ComponentQuery.query('#urlinfo')[0].hide();
                else
                    Ext.ComponentQuery.query('#urlinfo')[0].setValue(this.interestingUrl);

                if(jsonQuestions.questiona === undefined || jsonQuestions.questiona === "")
                    Ext.ComponentQuery.query('#q1info')[0].hide();
                else{
                    console.log("answering question a");
                    console.log(jsonQuestions.questiona);
                    Ext.getCmp('q1info').setLabel(jsonQuestions.questiona);
                    Ext.ComponentQuery.query('#q1info')[0].setValue(jsonResults.answera);
                }

                if(jsonQuestions.questionb === "" || jsonQuestions.questionb === undefined)
                    Ext.ComponentQuery.query('#q2info')[0].hide();
                else
                {
                    console.log("answering question b");
                    console.log(jsonQuestions.questionb);
                    Ext.getCmp('q2info').setLabel(jsonQuestions.questionb);
                    Ext.ComponentQuery.query('#q2info')[0].setValue(jsonResults.answerb);
                }

                if(jsonQuestions.questionc === "" || jsonQuestions.questionc === undefined)
                    Ext.ComponentQuery.query('#q3info')[0].hide();
                else
                {
                    console.log("answering question c");
                    console.log(jsonQuestions.questionc);
                    Ext.getCmp('q3info').setLabel(jsonQuestions.questionc);
                    Ext.ComponentQuery.query('#q3info')[0].setValue(jsonResults.answerc);
                }


                if(this.multipleQuestions === "" || this.multipleQuestions === undefined)
                {
                    Ext.ComponentQuery.query('#multiplechoicequestion')[0].hide();
                    Ext.ComponentQuery.query('#fieldMq')[0].hide();
                }
                else
                {
                    console.log("answering multiple question");
                    Ext.ComponentQuery.query('#multiplechoicequestion')[0].setValue(this.multipleQuestions);
                }
                displayMultipleAnswers(jsonMultipleQsAnswers);
            }

            for (var i = 0; i < markerRecords.length; ++i) {
                var data = markerRecords[i].getData(); //Get the data from the record

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data['lat'], data['lng']),
                    map: map,
                    customInfo : data["additionalAnswers"],
                    mediaId: data['media_id'],
                    partnerNames: data['partner_names'],
                    interestingUrl: data['interesting_url'],
                    multipleQuestions: data['multiple_question'],
                    jsonMultipleQsAnswers: data['choices']
                });

                google.maps.event.addListener(marker, 'click', function()
                {
                    var jsonResults  = JSON.parse(this.customInfo);
                    var mediaID = this.mediaId;
                    var jsonMultipleQsAnswers  = JSON.parse(this.jsonMultipleQsAnswers);

                    currentActivity.push({xtype:'huntinfopanel'});
                    displayQuestionInformations.call(this, jsonResults, jsonMultipleQsAnswers);
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