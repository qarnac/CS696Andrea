Ext.define('myApp.view.Blog', {
	extend: 'Ext.navigation.View',
	
	config:{
		title:'Blog',
		iconCls: 'star,
		
		items: {
			xtype: 'list',
			
			store: {
				fields: ['title', 'author', 'content'],
				
				//proxy tells how to load the data
				proxy: {
					type: 'jsonp',
					url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
                    reader: {
                        type: 'json',
                        rootProperty: 'responseData.feed.entries'
				}
			}
		}
	}
});