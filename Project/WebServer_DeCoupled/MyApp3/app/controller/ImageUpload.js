Ext.define('myApp.controller.ImageUpload', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.device.Notification',
        'Ext.Img'
    ],

    config: {
        refs: {
            imageUploadView : 'imageuploadform',
            'fileBtn': 'imageuploadform #fileBtn',
            'uploadBtn': 'imageuploadform #uploadBtn',
            'loadedImage': 'imageuploadform #loadedImage',

        },

        control: {
            loginView: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            fileBtn: {
                //success: 'onFileUploadSuccess',
                loadsuccess: 'onFileLoadSuccess',
                //failure: 'onFileUploadFailure'
            },

            /*
            backButton: {
                tap: 'backButtonTap',
            },
            */

            uploadBtn: {
                success: 'onFileUploadSuccess',
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

    onFileUploadSuccess: function(status,response, e, file) {
        console.log('Success');
        console.log(file);

        Ext.device.Notification.show({
            title: 'All right',
            message: 'File uploaded successfully',
            buttons: Ext.MessageBox.OK,
            callback: Ext.emptyFn
        });

       console.log(this);
       console.log(this.getUploadBtn());

        var view = this.getImageUploadView();
        view.parent.pop();


       //console.log(naView);
       // this.pop();
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
        console.log(dataurl);
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
