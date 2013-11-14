Ext.define('myApp.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            blog: 'hunts'
        },
        control: {
            'hunts list':{
				itemtap: 'showPost'
			}
        }
    },
	
	showPost: function(list, index, element, record){
		this.getBlog().push({
			xtype: 'panel',
			title: record.get('id'),
			html: record.get('latitude'),
			scrollable: true,
			styleHtmlContent: true
		});
	}
});
