Ext.define('myApp.controller.ImageUpload', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.device.Notification',
        'Ext.Img'
    ],

    config: {
        refs: {
            'fileBtn': 'imageuploadform #fileBtn',
            'fileLoadBtn': 'imageuploadform #fileLoadBtn',
            'loadedImage': 'imageuploadform #loadedImage'
        },

        control: {
            fileBtn: {
                success: 'onFileUploadSuccess',
                loadsuccess: 'onFileLoadSuccess',
                failure: 'onFileUploadFailure'
            },

            fileLoadBtn: {
                loadsuccess: 'onFileLoadSuccess',
                loadfailure: 'onFileLoadFailure'
            }
        }
    },

    launch: function() {
        console.log('Image upload controller')
    },

    onFileUploadSuccess: function(dataurl,response, e, file) {
        console.log('Success');


        Ext.device.Notification.show({
            title: 'All right',
            message: 'File uploaded successfully',
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });
    },

    onFileUploadFailure: function(message) {
        console.log('Failure');

        Ext.device.Notification.show({
            title: 'Uploading error',
            message: message,
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });

    },

    onFileLoadSuccess: function(dataurl, e) {
        console.log('File loaded');
        var me = this;
        var image = me.getLoadedImage();
        image.setSrc(dataurl);
    },

    onFileLoadFailure: function(message) {
        Ext.device.Notification.show({
            title: 'Loading error',
            message: message,
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });
    }

});
