Ext.define('myApp.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginView: 'loginview',
            editButton: '#editButton',
            questionForm: 'questionsform',
            qForm: '#questionsform',
            imageUpload: 'imageuploadform',
            multipleQuestion: 'multiplequestion',
            mQuestions: '#multiplequestion'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand',
                push: 'onMainPush',
                pop: 'onMainPop'
            },

            editButton: {
                tap: 'onContactEdit'
            }
        }
    },

    onMainPush: function(view, item) {
        console.log(item.xtype);

        var editButton = this.getEditButton();

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
        }

        if (item.xtype == "questionsform" || item.xtype == "multiplequestion") {
            this.showEditButton();
        }
        else
        {
            this.hideEditButton();
        }

    },


    onMainPop: function(view, item) {
        console.log('at pop');
        console.log(item.xtype);

        if(myApp.app.apiToken.currentPage == "success" && item.xtype == "imageuploadform")
        {
            myApp.app.apiToken.currentPage = "questionsform";

            console.log("success");
            console.log(myApp.app.apiToken.partners);
            console.log(myApp.app.apiToken.url);
            console.log(myApp.app.apiToken.answerQuestion1);
            console.log(myApp.app.apiToken.answerQuestion2);
            console.log(myApp.app.apiToken.answerQuestion3);

        }

        else if(item.xtype == "imageuploadform")
        {
            myApp.app.apiToken.currentPage = "multiplequestion";
        }

        else if (item.xtype == "multiplequestion")
        {

            console.log(Ext.ComponentQuery.query('#mq')[0]);

            myApp.app.apiToken.qMultiple = Ext.ComponentQuery.query('#mq')[0]._value;
            myApp.app.apiToken.answerA = Ext.ComponentQuery.query('#qa')[0]._value;
            myApp.app.apiToken.answerB = Ext.ComponentQuery.query('#qb')[0]._value;
            myApp.app.apiToken.answerC = Ext.ComponentQuery.query('#qc')[0]._value;
            myApp.app.apiToken.answerD = Ext.ComponentQuery.query('#qd')[0]._value;
            myApp.app.apiToken.answerE = Ext.ComponentQuery.query('#qe')[0]._value;


            myApp.app.apiToken.correctAnswer = Ext.ComponentQuery.query('#qSelect')[0]._value.data.value;

            myApp.app.apiToken.currentPage = "questionsform";
        }

        console.log(myApp.app.apiToken.currentPage);

        if( item.xtype == "questionsform" && myApp.app.apiToken.currentPage == "questionsform")
        {
            this.hideEditButton();
        }
        else
        {
            if( myApp.app.apiToken.currentPage == "questionsform" ||
                myApp.app.apiToken.currentPage == "multiplequestion")
                this.showEditButton();
            else
                this.hideEditButton();
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

    showEditButton: function() {
        var editButton = this.getEditButton();

        if (!editButton.isHidden()) {
            return;
        }

        editButton.show();
    },

    hideEditButton: function() {
        var editButton = this.getEditButton();

        if (editButton.isHidden()) {
            return;
        }

        editButton.hide();
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
                        console.log('More or less ' + crd.accuracy + ' meters.');

                        if((loginResponse.region.min_lat <= crd.latitude && crd.latitude <= loginResponse.region.max_lat) &&
                           (loginResponse.region.min_lng <= crd.longitude && crd.longitude <= loginResponse.region.max_lng) )
                        {
                            // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                            me.sessionToken = loginResponse.sessionToken;

                            myApp.app.apiToken = new QuestionHunt();

                            myApp.app.apiToken.questionA  = loginResponse.questions.questiona;
                            myApp.app.apiToken.questionB  = loginResponse.questions.questionb;
                            myApp.app.apiToken.questionC  = loginResponse.questions.questionc;

                            me.signInSuccess(loginView);     //Just simulating success.
                        }
                        else
                            me.signInFailure("Failure: Your current location is within hunt region bound");

                    };

                    function error(err) {
                        me.signInFailure(loginResponse.errors.reason);
                    };

                    navigator.geolocation.getCurrentPosition(successLogin, error, options);

                } else {
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