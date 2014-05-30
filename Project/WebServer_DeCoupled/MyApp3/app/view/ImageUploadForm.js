/**
 * Created by andrea on 2/2/14.
 */


Ext.define('myApp.view.ImageUploadForm', {
    extend: 'Ext.navigation.View',
    //extend: 'Ext.Panel',

    xtype: 'imageuploadform',

    requires: [
        'Ext.TitleBar',
        'Ext.Button',
        'Ext.ux.Fileup'
    ],

    config: {
        title: 'Forms',
        iconCls: "star",

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
                    /*
                    {
                        xtype: 'map',
                        width: '80%',
                        height: '200px',
                    },
                    */
                    {
                        xtype: 'fieldset',
                        //instructions:'Please fill all the questions',

                        items: [{
                            xtype: 'textareafield',
                            label: 'What is this question about?',
                            maxRows: 4,
                            name: 'q1',
                            labelWrap : true
                        }, {
                            xtype: 'textareafield',
                            label: 'How does this picture show what you\'ve learned in class?',
                            maxRows: 4,
                            name: 'q2',
                            labelWrap : true
                        }, {
                            xtype: 'textareafield',
                            label: 'What does this picture explain?',
                            maxRows: 4,
                            name: 'q3',
                            labelWrap : true
                        }, {
                            xtype: 'textareafield',
                            label: 'What question do you have about this picture?',
                            maxRows: 4,
                            name: 'q4',
                            labelWrap : true
                        }]
                    }
                ],


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