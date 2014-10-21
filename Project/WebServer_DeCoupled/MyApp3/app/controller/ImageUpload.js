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
                loadsuccess: 'onFileLoadSuccess',
            },


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
        console.log('Image upload controller');

        console.log(myApp.app.apiToken.qMultiple);


        /*
        function geo_success(position) {
            myApp.app.apiToken.gpsLat = position.coords.latitude; // user lat
            myApp.app.apiToken.gpsLng = position.coords.longitude; // user lng
        }

        function geo_error() {
            var view = this.getImageUploadView();
            alert("Sorry, no position is available. we will log the user out");
            view.parent.pop(3);
        }

        var geo_options = {
            enableHighAccuracy: true,
            maximumAge        : 30000,
            timeout           : 27000
        };

        var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
        */


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

        myApp.app.apiToken.partners  = "";
        myApp.app.apiToken.url       = "";

        myApp.app.apiToken.answerQuestion1 = "";
        myApp.app.apiToken.answerQuestion2 = "";
        myApp.app.apiToken.answerQuestion3 = "";

        myApp.app.apiToken.qMultiple = "";
        myApp.app.apiToken.answerA = "";
        myApp.app.apiToken.answerB = "";
        myApp.app.apiToken.answerC = "";
        myApp.app.apiToken.answerD = "";
        myApp.app.apiToken.answerE = "";
        myApp.app.apiToken.correctAnswer = "";

        myApp.app.apiToken.dataBlob = null; // for picture
        myApp.app.apiToken.gpsLat = 0.0; // user lat
        myApp.app.apiToken.gpsLng = 0.0; // user lng

        myApp.app.apiToken.huntX1    = 0.0; //rectangle stuff
        myApp.app.apiToken.huntX2    = 0.0; //rectangle stuff
        myApp.app.apiToken.huntY1    = 0.0; //rectangle stuff
        myApp.app.apiToken.huntY2    = 0.0; //rectangle stuff

        view.parent.pop(2);
        myApp.app.apiToken.currentPage = "success";
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
