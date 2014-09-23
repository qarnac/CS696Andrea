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
                id : 'partners',
                name: 'partners',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: 'Do you have an interesting link related to this article?',
                maxRows: 4,
                name: 'url',
                id : 'url',
                labelAlign: 'top',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: '',
                maxRows: 4,
                name: 'q1',
                id : 'q1',
                labelAlign: 'top',
                labelWrap : true
            }, {
                xtype: 'textareafield',
                label: '',
                maxRows: 4,
                name: 'q2',
                id : 'q2',
                labelAlign: 'top',
                labelWrap : true
            },
            {
                xtype: 'textareafield',
                label: '',
                maxRows: 4,
                name: 'q3',
                id : 'q3',
                labelAlign: 'top',
                labelWrap : true
            }]
        }]
    }
});
