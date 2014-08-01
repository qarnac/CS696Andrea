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
        'Ext.field.Radio'
    ],

    config: {
        title:'Question page 2/3',
        iconCls: "settings",
        scrollable: true,

        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    id: 'editButton',
                    text: 'next',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },

        items: [{
            xtype: 'fieldset',

            items: [
                {
                    xtype: 'textareafield',
                    label: 'Multiple choice question text?',
                    labelAlign: 'top',
                    maxRows: 4,
                    name: 'q1',
                    placeHolder: 'Please put your question here',
                    labelWrap : true
                }, {
                    xtype: 'textfield',
                    label: 'answer a:',
                    labelWidth: '30%',
                    name: 'a',
                    placeHolder: 'Enter answer a',
                    labelWrap : true
                }, {
                    xtype: 'textfield',
                    label: 'answer b:',
                    labelWidth: '30%',
                    name: 'b',
                    placeHolder: 'Enter answer b',
                    labelWrap : true
                }, {
                    xtype: 'textfield',
                    label: 'answer c:',
                    labelWidth: '30%',
                    name: 'c',
                    placeHolder: 'Enter answer c',
                    labelWrap : true
                },
                {
                    xtype: 'textfield',
                    label: 'answer d:',
                    labelWidth: '30%',
                    name: 'd',
                    placeHolder: 'Enter answer d',
                    labelWrap : true
                },
                {
                    xtype: 'textfield',
                    label: 'answer e:',
                    labelWidth: '30%',
                    name: 'e',
                    placeHolder: 'Enter answer e',
                    labelWrap : true
                },
                {
                    xtype: 'fieldset',
                    title: 'Select correct answer',
                    items: [{
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