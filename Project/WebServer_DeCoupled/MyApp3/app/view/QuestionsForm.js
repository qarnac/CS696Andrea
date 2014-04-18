/**
 * Created by andrea on 3/3/14.
 */
 
Ext.define('myApp.view.QuestionsForm', {
    extend: 'Ext.Panel',
	
	requires: [
		'Ext.data.proxy.*',
		'Ext.dataview.List',
		'Ext.data.reader.Reader',
        'Ext.data.Store',
        'Ext.data.proxy.JsonP',
	],
	
	xtype: 'questionsform',


	config:{
        title:'Questions',
        iconCls: 'star',
        scrollable: true,
        autoDestroy: false,

        navigationBar: {
            ui: 'dark',
            docked: 'top',
            items: [{
                xtype: 'button',
                text: 'Right',
                align: 'right'
            }]
        },



        items: [{
            xtype: 'fieldset',
            title: 'Questions',
            //instructions:'Please fill all the questions',

            items: [{
                xtype: 'textareafield',
                label: 'What is this question about?',
                maxRows: 4,
                name: 'q1',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'How does this picture show what you\'ve learned in class?',
                maxRows: 4,
                name: 'q2',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'What does this picture explain?',
                maxRows: 4,
                name: 'q3',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'What question do you have about this picture?',
                maxRows: 4,
                name: 'q4',
                labelWrap : true
            }]
        },{
            xtype: 'toolbar',
            layout:{
                pack:'center'
            }, //layout
            ui: 'plain',
        }]
	}
});
