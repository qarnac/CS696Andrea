Ext.define('myApp.view.MultipleQuestion', {
    extend: 'Ext.Panel',

    xtype: 'multiplequestion',
    id : 'multiplequestion',
    alias: "widget.multipleview",

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Toggle',
        'Ext.util.DelayedTask',
        'Ext.field.Radio',
        'Ext.field.Select'
    ],

    config: {
        title:'Question page 2/3',
        iconCls: "settings",
        scrollable: true,


        items: [{
            xtype: 'fieldset',

            items: [
                {
                    xtype: 'textareafield',
                    label: 'Multiple choice question text?',
                    id: 'mq',
                    maxRows: 4,
                    labelAlign: 'top',
                    name: 'mq',
                    placeHolder: 'Please put your question here',
                    labelWrap : true
                }, {
                    xtype: 'textfield',
                    label: 'answer a:',
                    id: 'qa',
                    labelWidth: '30%',
                    name: 'a',
                    placeHolder: 'Enter answer a',
                    labelWrap : true
                }, {
                    xtype: 'textfield',
                    label: 'answer b:',
                    id: 'qb',
                    labelWidth: '30%',
                    name: 'b',
                    placeHolder: 'Enter answer b',
                    labelWrap : true
                }, {
                    xtype: 'textfield',
                    label: 'answer c:',
                    id: 'qc',
                    labelWidth: '30%',
                    name: 'c',
                    placeHolder: 'Enter answer c',
                    labelWrap : true
                },
                {
                    xtype: 'textfield',
                    label: 'answer d:',
                    id: 'qd',
                    labelWidth: '30%',
                    name: 'd',
                    placeHolder: 'Enter answer d',
                    labelWrap : true
                },
                {
                    xtype: 'textfield',
                    label: 'answer e:',
                    id: 'qe',
                    labelWidth: '30%',
                    name: 'e',
                    placeHolder: 'Enter answer e',
                    labelWrap : true
                },
                {
                    xtype: 'fieldset',
                    title: 'Select correct answer',

                    items: [{
                        id: 'qSelect',
                        xtype: 'selectfield',
                        options:[
                            {
                                text: 'Answer a is correct',
                                value: 'a'
                            },
                            {
                                text: 'Answer b is correct',
                                value: 'b'
                            },
                            {
                                text: 'Answer c is correct',
                                value: 'c'
                            },
                            {
                                text: 'Answer d is correct',
                                value: 'd'
                            },
                            {
                                text: 'Answer e is correct',
                                value: 'e'
                            }
                        ]
                    }]
                },
            ]

        }]

    }
});