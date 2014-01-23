
Ext.define('myApp.store.GoogleMapStore', {
    extend: 'Ext.data.Store',

     requires: [
        'myApp.model.GoogleMap'
     ],

    config: {
        autoLoad: false,
        model: 'myApp.model.GoogleMap',

        //proxy tells how to load the data
        proxy: {
            type: 'ajax',
            //force to use method get
            useDefaultXhrHeader: false,
            url: 'http://southsuco.com/MyApp/php/queryMarkerForMap.php',

            reader: {
                type: 'xml',
                contentType: "text/XML;",
                rootProperty: 'markers',
                record: 'marker'
            }
        },

        launch: function() {
            console.log('im in  GOOOOOGLE STORE');
        },
    }

});