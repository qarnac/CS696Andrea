Ext.define('myApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
	
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
	
    config: {
        tabBarPosition: 'bottom',

        items: [
			{
				xtype: 'hunts'
			},
			{
				xtype: 'map',
			},
			{
				xtype: 'blog'
			},
			{
				xtype: 'loginform'
			}

        ]
	
    }
});
