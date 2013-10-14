Ext.define('myApp.view.PresidentList',{
	extend: 'Ext.List',
	xtype: 'presidentlist'
	
	requires: ['myApp.store.Presidents'],
	
	config{
		itemTpl: '{firstName} {lastName}',
		store: 'Presidents'
	}
	
});