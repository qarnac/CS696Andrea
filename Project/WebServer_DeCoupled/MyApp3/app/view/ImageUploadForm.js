/**
 * Created by andrea on 2/2/14.
 */


Ext.define('myApp.view.ImageUploadForm', {
    extend: 'Ext.Panel',

    xtype: 'imageuploadform',

    requires: [
        'Ext.Button',
        'Ext.ux.Fileup',
    ],

    config: {

        title:'Question page 2',
        scrollable: true,
        autoDestroy: false,

        items: [
            {
                styleHtmlContent: true,

                layout: {
                    type: 'vbox',
                    align: 'center'
                },

                items: [
                    {
                        html: 'You can upload file to server'
                    },

                    {
                        itemId: 'fileBtn',
                        xtype: 'fileupload',
                        text: 'Browse',
                        url: './src/php/getfile.php',
                        autoUpload: false
                    },

                    {
                        itemId: 'loadedImage',
                        xtype: 'img',
                        width: '80%',
                        height: '200px',
                        style: 'margin-top:15px;'

                    },
                    {
                        xtype: 'map',
                        width: '70%',
                        height: '200px',
                        style: 'margin-top:15px;',

                        listeners: {
                            maprender : function(comp, map){
                                new google.maps.Marker({
                                    position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
                                    map: map
                                });
                            }
                        }
                    },

                ]

            },
        ]
    },



});

/*
Ext.ComponentQuery.query('loginform')[0].getNavigationBar().add({
    xtype:'button',
    text:'Right',
    align:'right'
});
*/

