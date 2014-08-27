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
            console.log("IM HERE");
            console.log(myApp.app.apiToken.multipleChoice);
            Ext.ComponentQuery.query('#mq')[0].setValue(myApp.app.apiToken.multipleChoice);
            Ext.ComponentQuery.query('#qa')[0].setValue(myApp.app.apiToken.answerA);
            Ext.ComponentQuery.query('#qb')[0].setValue(myApp.app.apiToken.answerB);
            Ext.ComponentQuery.query('#qc')[0].setValue(myApp.app.apiToken.answerC);
            Ext.ComponentQuery.query('#qd')[0].setValue(myApp.app.apiToken.answerD);
            Ext.ComponentQuery.query('#qe')[0].setValue(myApp.app.apiToken.answerE);
            Ext.ComponentQuery.query('#qSelect')[0].setValue(myApp.app.apiToken.correctAnswer);

        }
        else if (item.xtype == "questionsform")
        {

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
            myApp.app.apiToken.currentPage = "questionsform";

        else if(item.xtype == "imageuploadform")
        {
            myApp.app.apiToken.currentPage = "multiplequestion";
        }

        else if (item.xtype == "multiplequestion")
        {

            myApp.app.apiToken.multipleChoice = Ext.ComponentQuery.query('#mq')[0]._value;
            myApp.app.apiToken.answerA = Ext.ComponentQuery.query('#qa')[0]._value;
            myApp.app.apiToken.answerB = Ext.ComponentQuery.query('#qb')[0]._value;
            myApp.app.apiToken.answerC = Ext.ComponentQuery.query('#qc')[0]._value;
            myApp.app.apiToken.answerD = Ext.ComponentQuery.query('#qd')[0]._value;
            myApp.app.apiToken.answerE = Ext.ComponentQuery.query('#qe')[0]._value;

            myApp.app.apiToken.correctAnswer = Ext.ComponentQuery.query('#qSelect')[0]._value.data.value;

            console.log(myApp.app.apiToken.multipleChoice);

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

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success === true) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionToken;
                    me.signInSuccess(loginView);     //Just simulating success.
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

        myApp.app.apiToken = new QuestionHunt();

        var test = this.getLoginView();
        test.setMasked(false);

        test.push({xtype:'questionsform'});

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