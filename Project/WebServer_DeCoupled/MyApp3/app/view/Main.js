Ext.define('myApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
    ],
	
    config: {
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
