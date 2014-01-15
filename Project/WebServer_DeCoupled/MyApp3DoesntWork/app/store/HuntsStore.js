Ext.define('myApp.store.HuntsStore', {
	extend: 'Ext.data.Store',

    /*
	requires: [
		'myApp.model.Hunt'
	],
	*/
	
	config: {
        model: 'myApp.model.Hunt',
        autoLoad: true,

        //proxy tells how to load the data
        proxy: {
            type: 'ajax',
            //force to use method get
            useDefaultXhrHeader: false,

            url: 'http://southsuco.com/MyApp3/php/HomeDisplayHunt.php',

            reader: {
                type: 'xml',
                contentType: "text/XML;",
                rootProperty: 'hunts',
                record: 'hunt'
            }

        }
	}


});