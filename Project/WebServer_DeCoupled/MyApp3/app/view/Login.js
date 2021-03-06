Ext.define('myApp.view.Login', {
    extend: 'Ext.navigation.View',

    xtype: 'loginform',
    id:'loginForm',
    alias: "widget.loginview",

    // http://miamicoder.com/2012/adding-a-login-screen-to-a-sencha-touch-application/

	//this is like include for libraries
	requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.Img',
        'Ext.field.Toggle',
        'Ext.util.DelayedTask'
	],
	
	config: {
		title: 'Login',
		iconCls: "settings",

        navigationBar: {

            items: [
                {
                    xtype: 'button',
                    id: 'nextButton',
                    text: 'next',
                    align: 'right',
                    hidden: true,
                    width: '50',
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
                {
                    xtype: 'button',
                    id: 'logoutButton',
                    itemId: 'logoutButton',
                    text: 'logout',
                    align: 'right',
                    margin: '.5',
                    ui: 'green-round',
                    hidden: true,
                    width: '80',
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },



        items: [{
            fullscreen:true,
            scroll:false,
            xtype:'panel',

		    items: [
            {
                xtype: 'label',
                html: 'Login failed. Please enter the correct credentials.',
                itemId: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
			{
				xtype: 'fieldset',	//this is to make nice lines on the items
				title: 'Login Form', //making it look nicer
				instructions: '(Login for students)',

				items:[
					{
						xtype: 'textfield',
						name: 'username',
						label: 'Username',
                        itemId: 'userNameTextField',
                        required: true

                    },
					{
						xtype: 'passwordfield',
						name: 'password',
						label: 'Password',
                        itemId: 'passwordTextField',
                        required: true
                    }
				]

			},
            {
                xtype: 'button',
                itemId: 'btnLogin',
                ui: 'confirm',
                padding: '10px',
                text: 'Log In'
            },
		],

        }],

        listeners: [
            {
                fn: 'onLoginButtonTap',
                event: 'tap',
                delegate: '#btnLogin'
            },
            {
                fn: 'onLogoutButtonTap',
                event: 'tap',
                delegate: '#logoutButton'
            },
        ]

	},

    onLogoutButtonTap: function(button, e,eOpts)
    {
        var me = this;
        me.fireEvent('logoutCommand', me);
    },


    onLoginButtonTap: function(button, e, eOpts) {
        var me = this,
            usernameField = me.down('#userNameTextField'),
            passwordField = me.down('#passwordTextField'),
            label = me.down('#signInFailedLabel'),
            username = usernameField.getValue(),
            password = passwordField.getValue();

        label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {

            label.setHtml('');

            me.fireEvent('signInCommand', me, username, password);

            usernameField.setValue('');
            passwordField.setValue('');
        });

        task.delay(500);

    },

    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
        label.setHtml(message);
        label.show();
    }


});
