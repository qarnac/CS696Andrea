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
				xtype: 'hunts'
			},
			{
				xtype: 'map'
			},
			{
				xtype: 'loginform'
			}

        ]
	
    }
});
