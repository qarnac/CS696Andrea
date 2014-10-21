Ext.define('myApp.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginView: 'loginview',
            nextButton: '#nextButton',
            logoutButton: '#logoutButton',
            questionForm: 'questionsform',
            qForm: '#questionsform',
            imageUpload: 'imageuploadform',
            multipleQuestion: 'multiplequestion',
            mQuestions: '#multiplequestion'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand',
                logoutCommand: 'onLogoutCommand',
                push: 'onMainPush',
                pop: 'onMainPop'
            },

            nextButton: {
                tap: 'onContactEdit'
            }
        }
    },

    onMainPush: function(view, item) {
        console.log(item.xtype);

        var nextButton = this.getNextButton();

        if(item.xtype == "questionsform")
        {
            console.log(Ext.getCmp('q2'));
            console.log(Ext.getCmp('q2').getLabel);

            if(myApp.app.apiToken.questionA ==  "")
                Ext.getCmp('q1').hide();
            if(myApp.app.apiToken.questionB ==  "")
                Ext.getCmp('q2').hide();
            if(myApp.app.apiToken.questionC == "")
                Ext.getCmp('q3').hide();

            this.showLogoutButton();
        }

        myApp.app.apiToken.currentPage = item.xtype;

        if(item.xtype == "multiplequestion")
        {
            Ext.ComponentQuery.query('#mq')[0].setValue(myApp.app.apiToken.qMultiple);
            Ext.ComponentQuery.query('#qa')[0].setValue(myApp.app.apiToken.answerA);
            Ext.ComponentQuery.query('#qb')[0].setValue(myApp.app.apiToken.answerB);
            Ext.ComponentQuery.query('#qc')[0].setValue(myApp.app.apiToken.answerC);
            Ext.ComponentQuery.query('#qd')[0].setValue(myApp.app.apiToken.answerD);
            Ext.ComponentQuery.query('#qe')[0].setValue(myApp.app.apiToken.answerE);
            Ext.ComponentQuery.query('#qSelect')[0].setValue(myApp.app.apiToken.correctAnswer);

        }
        else if(item.xtype == "imageuploadform")
        {
            console.log("in image upload form");
            myApp.app.apiToken.qMultiple = Ext.ComponentQuery.query('#mq')[0]._value;
            myApp.app.apiToken.answerA = Ext.ComponentQuery.query('#qa')[0]._value;
            myApp.app.apiToken.answerB = Ext.ComponentQuery.query('#qb')[0]._value;
            myApp.app.apiToken.answerC = Ext.ComponentQuery.query('#qc')[0]._value;
            myApp.app.apiToken.answerD = Ext.ComponentQuery.query('#qd')[0]._value;
            myApp.app.apiToken.answerE = Ext.ComponentQuery.query('#qe')[0]._value;
            myApp.app.apiToken.correctAnswer = Ext.ComponentQuery.query('#qSelect')[0]._value._data.value;

            this.hideNextButton();
        }

        if (item.xtype == "questionsform" || item.xtype == "multiplequestion") {
            this.showNextButton();
        }
        else
        {
            this.hideNextButton();
        }

    },

    onMainPop: function(view, item) {
        console.log('at pop');
        console.log(item.xtype);

        if(myApp.app.apiToken.currentPage == "logout")
        {
            myApp.app.apiToken.currentPage = "loginform";
            this.hideNextButton();
            this.hideLogoutButton();
        }

        else if(myApp.app.apiToken.currentPage == "success" && item.xtype == "imageuploadform")
        {
            myApp.app.apiToken.currentPage = "questionsform";

            console.log("success");

            Ext.getCmp('partners').setValue("");
            Ext.getCmp('url').setValue("");
            Ext.getCmp('q1').setValue("");
            Ext.getCmp('q2').setValue("");
            Ext.getCmp('q3').setValue("");

            console.log(myApp.app.apiToken.partners);
            console.log(myApp.app.apiToken.url);
            console.log(myApp.app.apiToken.answerQuestion1);
            console.log(myApp.app.apiToken.answerQuestion2);
            console.log(myApp.app.apiToken.answerQuestion3);

            this.showNextButton();
        }

        else if(item.xtype == "imageuploadform")
        {
            this.showNextButton();
            myApp.app.apiToken.currentPage = "multiplequestion";
        }

        else if (item.xtype == "multiplequestion" && myApp.app.apiToken.currentPage != "imageuploadform")
        {
            myApp.app.apiToken.qMultiple = String(Ext.ComponentQuery.query('#mq')[0]._value);
            myApp.app.apiToken.answerA   = String(Ext.ComponentQuery.query('#qa')[0]._value);
            myApp.app.apiToken.answerB   = String(Ext.ComponentQuery.query('#qb')[0]._value);
            myApp.app.apiToken.answerC   = String(Ext.ComponentQuery.query('#qc')[0]._value);
            myApp.app.apiToken.answerD   = String(Ext.ComponentQuery.query('#qd')[0]._value);
            myApp.app.apiToken.answerE   = String(Ext.ComponentQuery.query('#qe')[0]._value);

            myApp.app.apiToken.correctAnswer = Ext.ComponentQuery.query('#qSelect')[0]._value.data.value;

            myApp.app.apiToken.currentPage = "questionsform";
        }

        else if (item.xtype == "questionsform" && myApp.app.apiToken.currentPage == "questionsform")
        {
            myApp.app.apiToken.currentPage = "loginform";
            this.hideNextButton();
            this.hideLogoutButton();
        }

        else
        {
            if( myApp.app.apiToken.currentPage == "questionsform" ||
                myApp.app.apiToken.currentPage == "multiplequestion")
                this.showNextButton();

        }

    },

    onContactEdit: function(button) {
        console.log("on next button pressed");
        console.log(this);
        console.log(myApp.app.apiToken.currentPage);

        if (myApp.app.apiToken.currentPage == "questionsform") {
            this.multipleQuestion = Ext.create('myApp.view.MultipleQuestion');

            var frmItems = this.getQForm().getItems();

            myApp.app.apiToken.partners =  frmItems.items[0]._items.items[0]._value;
            myApp.app.apiToken.url =  frmItems.items[0]._items.items[1]._value;
            myApp.app.apiToken.answerQuestion1 =  frmItems.items[0]._items.items[2]._value;
            myApp.app.apiToken.answerQuestion2 =  frmItems.items[0]._items.items[3]._value;
            myApp.app.apiToken.answerQuestion3 =  frmItems.items[0]._items.items[4]._value;

            console.log(myApp.app.apiToken.partners);
            console.log(myApp.app.apiToken.url);
            console.log(myApp.app.apiToken.answerQuestion1);
            console.log(myApp.app.apiToken.answerQuestion2);
            console.log(myApp.app.apiToken.answerQuestion3);

            this.getLoginView().push(this.multipleQuestion);
        }
        else if (myApp.app.apiToken.currentPage == "multiplequestion")
        {

            this.imageUpload = Ext.create('myApp.view.ImageUploadForm');
            this.getLoginView().push(this.imageUpload);
        }

    },

    showNextButton: function() {
        var nextButton = this.getNextButton();

        if (!nextButton.isHidden()) {
            return;
        }

        nextButton.show();
    },

    hideNextButton: function() {
        var nextButton = this.getNextButton();

        if (nextButton.isHidden()) {
            return;
        }

        nextButton.hide();
    },

    showLogoutButton: function() {
        var logoutButton = this.getLogoutButton();

        if (!logoutButton.isHidden()) {
            return;
        }

        logoutButton.show();
    },

    hideLogoutButton: function() {
        var logoutButton = this.getLogoutButton();

        if (logoutButton.isHidden()) {
            return;
        }

        logoutButton.hide();
    },

    // Session tokenS
    sessionToken: null,

    // Transitions
    getSlideLeftTransition: function() {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function() {
        return { type: 'slide', direction: 'right' };
    },

    onLogoutCommand: function(view){

        switch(myApp.app.apiToken.currentPage){
            case "questionsform":
                console.log("kicking out from questionsform");
                view.pop(1);
                break;
            case "multiplequestion":
                console.log("kicking out from multiplequestion");
                view.pop(2);
                break;
            case "imageuploadform":
                console.log("kicking out from imageuploadform");
                view.pop(3);
                break;
            default:
                break;


        }

        myApp.app.apiToken.currentPage = "logout";

    },

    onSignInCommand: function (view, username, password) {

        console.log('Username: ' + username + '\n' + 'Password: ' + password);

        var me = this,

        loginView = me.getLoginView();

        if (username.length === 0 || password.length === 0) {

            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });

        Ext.Ajax.request({
            url: '../MyApp/php/login.php',
            method: 'post',
            params: {
                user: username,
                pwd: password
            },

            success: function (response) {

                console.log(response);

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success == true) {

                    var options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    };

                    function successLogin(pos) {
                        var crd = pos.coords;

                        console.log('Your current position is:');
                        console.log('Latitude : ' + crd.latitude);
                        console.log('Longitude: ' + crd.longitude);
                        console.log('Minlat:' + loginResponse.region.min_lat);
                        console.log('Maxlat:' + loginResponse.region.max_lat);
                        console.log('Minlng:' + loginResponse.region.min_lng);
                        console.log('Maxlng:' + loginResponse.region.max_lng);
                        console.log('hunt id :' + loginResponse.hunt);
                        console.log('More or less ' + crd.accuracy + ' meters.');


                        if((loginResponse.region.min_lat <= crd.latitude && crd.latitude <= loginResponse.region.max_lat) &&
                           (loginResponse.region.min_lng <= crd.longitude && crd.longitude <= loginResponse.region.max_lng) )
                        {
                            // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                            me.sessionToken = loginResponse.sessionToken;

                            myApp.app.apiToken = new QuestionHunt();
                            myApp.app.apiToken.huntId = loginResponse.hunt;
                            myApp.app.apiToken.gpsLat = crd.latitude;
                            myApp.app.apiToken.gpsLng = crd.longitude;
                            myApp.app.apiToken.questionA  = loginResponse.questions.questiona;
                            myApp.app.apiToken.questionB  = loginResponse.questions.questionb;
                            myApp.app.apiToken.questionC  = loginResponse.questions.questionc;

                            me.signInSuccess(loginView);     //Just simulating success.
                        }
                        else
                            me.signInFailure("Failure: Your current location is NOT within hunt region");



                    }

                    function error(err) {
                        me.hideLogoutButton();
                        me.hideNextButton();
                        me.signInFailure(loginResponse.errors.reason);
                    }

                    navigator.geolocation.getCurrentPosition(successLogin, error, options);

                } else {
                    me.hideLogoutButton();
                    me.hideNextButton();
                    me.signInFailure(loginResponse.errors.reason);
                }
            },

            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure('Login failed. Please try again later.');
            }
        });
    },

    signInSuccess: function () {
        console.log('Signed in.');

        var test = this.getLoginView();
        test.setMasked(false);

        test.push({xtype:'questionsform'});


        Ext.getCmp('q1').setLabel(myApp.app.apiToken.questionA);
        Ext.getCmp('q2').setLabel(myApp.app.apiToken.questionB);
        Ext.getCmp('q3').setLabel(myApp.app.apiToken.questionC);


    },

    signInFailure: function (message) {
        console.log('Sign in Fail.');
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },

    onSignOffCommand: function () {

        var me = this;

        Ext.Ajax.request({
            url: '../../services/logoff.ashx',
            method: 'post',
            params: {
                sessionToken: me.sessionToken
            },

            success: function (response) {

                // TODO: You need to handle this condition.
            },

            failure: function (response) {

                // TODO: You need to handle this condition.
            }
        });

        Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
    }
});