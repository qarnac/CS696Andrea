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
                label: 'What is this question about?',
                labelAlign: 'top',
                maxRows: 4,
                name: 'questioninput',
                labelWrap : true
            },

            {
                layout: 'hbox',
                defaults: {
                    align: 'middle'
                },

                items:[
                {
                    xtype: 'textfield',
                    placeHolder: 'Enter answer a',
                    width: '70%',
                    name: 'qa',
                    labelWrap : true,
                    checked: true
                },
                {
                    xtype: 'radiofield',
                    name : 'a',
                    value: 'green'
                }]
            },

            {

                layout: 'hbox',
                defaults: {
                    align: 'left'
                },

                items:[
                    {
                        xtype: 'textfield',
                        placeHolder: 'Enter answer b',
                        width: '70%',
                        name: 'qb',
                        labelWrap : true,
                    },
                    {
                        xtype: 'radiofield',
                        name : 'b',
                        value: 'green'
                    }]
            },

            {
                layout: 'hbox',
                defaults: {
                    align: 'left'
                },

                items:[
                    {
                        xtype: 'textfield',
                        placeHolder: 'Enter answer c',
                        width: '70%',
                        name: 'qc',
                        labelWrap : true,
                    },
                    {
                        xtype: 'radiofield',
                        name : 'c',
                        value: 'green'
                    }]
            },

            {
                layout: 'hbox',
                defaults: {
                    align: 'left'
                },

                items:[
                    {
                        xtype: 'textfield',
                        placeHolder: 'Enter answer d',
                        width: '70%',
                        name: 'qd',
                        labelWrap : true,
                    },
                    {
                        xtype: 'radiofield',
                        name : 'd',
                        value: 'green'
                    }]
            },

            {
                layout: 'hbox',
                defaults: {
                    align: 'left'
                },

                items:[
                    {
                        xtype: 'textfield',
                        placeHolder: 'Enter answer e',
                        width: '70%',
                        name: 'qe',
                        labelWrap : true,
                    },
                    {
                        xtype: 'radiofield',
                        name : 'e',
                        value: 'green'
                    }]
            },
        ]

        }]
    }
});