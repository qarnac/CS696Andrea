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
                label: 'Who are the partners in this group?',
                labelAlign: 'top',
                maxRows: 4,
                name: 'partners',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'Do you have an interesting link related to this article?',
                maxRows: 4,
                name: 'url',
                labelAlign: 'top',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'What does this picture explain?',
                maxRows: 4,
                name: 'q1',
                labelAlign: 'top',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'What question do you have about this picture?',
                maxRows: 4,
                name: 'q2',
                labelAlign: 'top',
                labelWrap : true
            },
            {
                xtype: 'textareafield',
                label: 'What do you want people to focus on this picture',
                maxRows: 4,
                name: 'q3',
                labelAlign: 'top',
                labelWrap : true
            }]
        }]
    }
});
