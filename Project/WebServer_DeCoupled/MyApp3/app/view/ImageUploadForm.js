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
        itemId: 'imageuploadform',

        items: [
            {
                styleHtmlContent: true,

                layout: {
                    type: 'vbox',
                    align: 'center'

                },

                defaults: {
                    margin: 10,
                    width: 200
                }, // defaults

                items: [
                    {
                        html: 'You can upload file to server'
                    },

                    {
                        itemId: 'uploadBtn',
                        xtype: 'fileupload',
                        iconMask: true,
                        url: './src/php/getfile.php',
                        autoUpload: false

                    },

                    {
                        itemId: 'fileBtn',
                        xtype: 'fileupload',
                        icon : './touch/resources/themes/images/windows-phone/dark/pictos/photo3.png',
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

                                myApp.app.apiToken.latitude = this._geo.getLatitude();
                                myApp.app.apiToken.longitude = this._geo.getLongitude();

                                console.log(myApp.app.apiToken.latitude);
                                console.log(myApp.app.apiToken.longitude);

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

