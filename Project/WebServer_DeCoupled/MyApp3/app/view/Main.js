Ext.define('myApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [

    ],
	
    config: {
        defaults: {
            html: 'placeholder text',
            styleHtmlContent: true
        },

        tabBarPosition: 'bottom',

        items: [
			{
				xtype: 'huntspanel'
			},
			{
				xtype: 'map'
			},
			{
				xtype: 'loginform'
			},

        ]
	
    }
});
