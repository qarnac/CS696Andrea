/**
 * Created by andrea on 2/2/14.
 */


Ext.define('myApp.view.ImageUploadForm', {
    extend: 'Ext.Panel',

    xtype: 'imageuploadform',

    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.ux.Fileup'
    ],

    config: {
        title: 'Picture',
        iconCls: "star",

        items: [
            {
                //scrollable: true,
                //styleHtmlContent: true,

                layout: {
                    type: 'vbox',
                    align: 'center'
                },

                items: [
                    {
                        xtype: 'titlebar',
                        docked: 'top',
                        title: 'Camera Upload'
                    },

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

                    }
                ]


            },

            /*
            {
                html: 'You can upload file to server'
            },

            {
                itemId: 'fileBtn',
                xtype: 'fileupload',
                text: 'Browse',
                url: './src/php/getTemporaryImages.php',
                autoUpload: false
            },

            {
                itemId: 'loadedImage',
                xtype: 'img',
                width: '80%',
                height: '200px',
                style: 'margin-top:15px;'

            }
            */

        ]}


});