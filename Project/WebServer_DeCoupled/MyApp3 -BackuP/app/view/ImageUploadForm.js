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
        title:'Picture',

        items: [
            {
                scrollable: true,
                styleHtmlContent: true,

                layout: {
                    type: 'vbox',
                    align: 'center'
                },

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
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

                    },

                ]

            }
        ]
    }


});