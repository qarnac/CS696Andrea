Ext.define('myApp.controller.Login', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginView: 'loginview',
            editButton: '#editButton',
            questionForm: 'questionsform',
            qForm: '#questionsform',
            imageUpload: 'imageuploadform',
            multipleQuestion: 'multiplequestion'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand',
                push: 'onMainPush',
                pop: 'onMainPop'
            },

            editButton: {
                tap: 'onContactEdit'
            },

            //mainMenuView: {
            //    onSignOffCommand: 'onSignOffCommand'
            //}
        }
    },

    onMainPush: function(view, item) {
        console.log(item.xtype);

        var editButton = this.getEditButton();

        if (item.xtype == "questionsform") {
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

        if(item.xtype == "multiplequestion")
            this.showEditButton();
        else
            this.hideEditButton();

    },


    onContactEdit: function(button) {
        console.log("on next button pressed");
        console.log(this);

        if (!this.questionForm) {
            this.multipleQuestion = Ext.create('myApp.view.MultipleQuestion');

            var frmItems = this.getQForm().getItems();

            myApp.app.apiToken.question1 =  frmItems.items[0]._items.items[0]._value;
            myApp.app.apiToken.question2 =  frmItems.items[0]._items.items[1]._value;
            myApp.app.apiToken.question3 =  frmItems.items[0]._items.items[2]._value;
            myApp.app.apiToken.question4 =  frmItems.items[0]._items.items[3]._value;

            console.log(myApp.app.apiToken.question1);
            console.log(myApp.app.apiToken.question2);
            console.log(myApp.app.apiToken.question3);
            console.log(myApp.app.apiToken.question4);

            this.getLoginView().push(this.multipleQuestion);
        }
        /*
        else if (this.multipleQuestion)
        {
            this.imageUpload = Ext.create('myApp.view.ImageUpload');

            this.getLoginView().push(this.imageUpload);
        }*/

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