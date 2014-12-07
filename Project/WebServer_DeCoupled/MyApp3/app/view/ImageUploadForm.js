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

        title:'3/3',
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
                                var geo = Ext.create('Ext.util.Geolocation', {
                                    autoUpdate: false,
                                    listeners: {
                                        locationupdate: function(geo) {
                                            var currentLat = geo.getLatitude();
                                            var currentLng =  geo.getLongitude();
                                            var altitude = geo.getAltitude();
                                            var speed = geo.getSpeed();
                                            var heading= geo.getHeading();

                                            myApp.app.apiToken.gpsLat = currentLat;
                                            myApp.app.apiToken.gpsLng = currentLng;

                                            new google.maps.Marker({
                                                map       : map,
                                                position  : new google.maps.LatLng(currentLat, currentLng),
                                                title     : 'Drag Marker To New Position'
                                            });
                                        },
                                        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                                            if(bTimeout)
                                                Ext.Msg.alert('Timeout occurred',"Could not get current position");
                                            else
                                                alert('Error occurred.');
                                        }
                                    }
                                });

                                geo.updateLocation();

                            }
                        }
                    },

                ]

            },
        ]
    },



});

