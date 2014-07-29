/**
 * Created by andrea on 3/3/14.
 */

Ext.define('myApp.view.QuestionsForm', {
    extend: 'Ext.Panel',

    xtype: 'questionsform',
    id : 'questionsform',

    requires: [
        'Ext.data.proxy.*',
        'Ext.dataview.List',
        'Ext.data.reader.Reader',
        'Ext.data.Store',
        'Ext.data.proxy.JsonP',
    ],

    config:{
        title:'Question page 1/3',
        scrollable: true,
        autoDestroy: false,

        items: [{
            xtype: 'fieldset',
            //instructions:'Please fill all the questions',

            items: [{
                xtype: 'textareafield',
                label: 'What is this question about?',
                labelAlign: 'top',
                maxRows: 4,
                name: 'q1',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'How does this picture show what you\'ve learned in class?',
                maxRows: 4,
                name: 'q2',
                labelAlign: 'top',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'What does this picture explain?',
                maxRows: 4,
                name: 'q3',
                labelAlign: 'top',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'What question do you have about this picture?',
                maxRows: 4,
                name: 'q4',
                labelAlign: 'top',
                labelWrap : true
            }]
        }]
    }
});
