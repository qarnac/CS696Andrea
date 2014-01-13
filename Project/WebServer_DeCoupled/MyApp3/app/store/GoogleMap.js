
Ext.define('myApp.store.GoogleMapStore', {
    extend: 'Ext.data.Store',


     requires: [
     'myApp.model.Hunt'
     ],


    config: {
        autoLoad: false,

        //proxy tells how to load the data
        proxy: {
            type: 'ajax',
            //force to use method get
            useDefaultXhrHeader: false,
            url: 'http://southsuco.com/MyApp3/php/queryMarkerForMap.php.php',

            reader: {
                type: 'xml',
                contentType: "text/XML;",
                rootProperty: 'markers',
                record: 'marker'
            }
        }
    }
});