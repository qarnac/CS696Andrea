/**
 * Created by andrea on 3/3/14.
 */
 
Ext.define('myApp.view.QuestionsForm', {
	extend: 'Ext.navigation.View',
	
	requires: [
		'Ext.data.proxy.*',
		'Ext.dataview.List',
		'Ext.data.reader.Reader',
        'Ext.data.Store',
        'Ext.data.proxy.JsonP',
	],
	
	xtype: 'questionsform',

	config:{
		title:'Hunt',
		iconCls: 'home',

        items:[{
			xtype: 'list',
			title: 'Scavenger Hunt',
			itemTpl: '{title}',

            store: 'HuntsStore',
            control: 'Hunts'
		}]
	}
});
