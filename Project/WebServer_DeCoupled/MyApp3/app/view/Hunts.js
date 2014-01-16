Ext.define('myApp.view.Hunts', {
	extend: 'Ext.navigation.View',
	
	requires: [
		'Ext.data.proxy.*',
		'Ext.dataview.List',
		'Ext.data.reader.Reader',
        'Ext.data.Store',
        'Ext.data.proxy.JsonP',
	],
	
	xtype: 'huntspanel',

	config:{
		title:'Hunt',
		iconCls: 'home',


        items:[{
			xtype: 'list',
			title: 'Scavenger Hunt',
			itemTpl: '{title}',

            store: 'HuntsStore'
		}]

	}
});