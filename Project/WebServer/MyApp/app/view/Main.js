Ext.define('myApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
	
    config: {
        tabBarPosition: 'top',

        items: [
            {
                title: 'CyberScavenger',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Cyber Scavenger Hunt'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
			
            {
                title: 'Login',
                iconCls: 'settings',
				
				styleHtmlContent: true,
                scrollable: true,

                items: 
				{
						docked: 'top',
						xtype: 'titlebar',
						title: 'Login'
				},
               
				
				html: [
					'<img src="http://staging.sencha.com/img/sencha.png" />',
					'<h1>Welcome to Sencha Touch</h1>',
					"<p>You're creating the Getting Started app. This demonstrates how ",
					"to use tabs, lists and forms to create a simple app</p>",
					'<h2>Sencha Touch (2.0.0)</h2>'
                ].join("")
            },
			
            {
                title: 'LOL',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
						html: [
								'<img src="http://staging.sencha.com/img/sencha.png" />',
								'<h1>Welcome to Sencha Touch</h1>',
								"<p>You're creating the Getting Started app. This demonstrates how ",
								"to use tabs, lists and forms to create a simple app</p>",
								'<h2>Sencha Touch (2.0.0)</h2>'
							].join("")
                    }
                ]
            },			

        ]
    }
});
