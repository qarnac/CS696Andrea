Ext.define('myApp.view.Login', {
	extend: 'Ext.form.Panel',		// form page
	xtype: 'loginform',
    id:'loginForm',
	
	//this is like include for libraries
	requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Password',
        'Ext.Img',
        'Ext.field.Toggle'
	],
	
	config: {
		title: 'Login',
		iconCls: "settings",
		url: 'login.php',
		
		items: [
			{
				xtype: 'fieldset',	//this is to make nice lines on the items 
				title: 'Login Form', //making it look nicer
				instructions: '(Login for students/teachers)',
				
				items:[
					{
						xtype: 'textfield',
						name: 'username',
						label: 'Username'
					},
					{
						xtype: 'textfield',
						name: 'password',
						label: 'Password'
					}
				]
				
			},
			{
				xtype: 'button',
				text: 'login',
				ui: 'confirm',
				handler: function(){
					this.up('loginform').submit();
				}
			}
		]
	}
});