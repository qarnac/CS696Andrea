Ext.define('myApp.view.HuntInformation', {
    extend: 'Ext.Panel',

    xtype: 'huntinfopanel',
    alias: 'widget.huntinfopanel',

    config: {

        title:'Hunt Information',
        scrollable: true,
        autoDestroy: false,

        items: [
            {
                styleHtmlContent: true,

                items: [
                    {
                        layout: {
                            align: 'center'
                        },

                        itemId: 'imageStuffId',
                        id : 'imageStuffId',
                        xtype: 'image',
                        height: '200px',
                        //style: 'margin-top:15px;'

                    },
                    {
                        xtype: 'fieldset',
                        flex: 10,
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Who are the partners in this group?',
                                labelAlign: 'top',
                                id : 'partnersinfo',
                                name: 'partnersinfo',
                                readOnly: true,
                                labelWrap : true
                            }, {
                                xtype: 'textfield',
                                label: 'Do you have an interesting link related to this article?',
                                name: 'urlinfo',
                                id : 'urlinfo',
                                labelAlign: 'top',
                                readOnly: true,
                                labelWrap : true
                            }, {
                                xtype: 'textfield',
                                label: 'test1',
                                name: 'q1info',
                                id : 'q1info',
                                labelAlign: 'top',
                                readOnly: true,
                                labelWrap : true
                            }, {
                                xtype: 'textfield',
                                label: 'test2',
                                name: 'q2info',
                                id : 'q2info',
                                labelAlign: 'top',
                                readOnly: true,
                                labelWrap : true
                            },
                            {
                                xtype: 'textfield',
                                label: 'test3',
                                name: 'q3info',
                                id : 'q3info',
                                labelAlign: 'top',
                                readOnly: true,
                                labelWrap : true
                            },
                            {
                                xtype: 'textfield',
                                label: 'Multiple choice question',
                                id: 'multiplechoicequestion',
                                maxRows: 4,
                                labelAlign: 'top',
                                name: 'multiplechoicequestion',
                                readOnly: true,
                                labelWrap : true
                            },
                            {
                                xtype: 'fieldset',
                                id: 'fieldMq',

                                defaultType: 'checkboxfield',
                                defaults: {
                                    flex: '1'
                                },

                                //layout: 'hbox',

                                items: [{
                                    xtype: 'checkboxfield',
                                    name : 'color',
                                    value: 'a',
                                    checked: false,
                                    label: 'a)',
                                    labelWidth: '95%',
                                    labelAlign: 'right',
                                    id: 'answera1'

                                },
                                {
                                    xtype: 'checkboxfield',
                                    name : 'color',
                                    value: 'b',
                                    checked: false,
                                    label: 'b)',
                                    labelWidth: '95%',
                                    labelAlign: 'right',
                                    id: 'answerb2'

                                },
                                {
                                    xtype: 'checkboxfield',
                                    name : 'color',
                                    value: 'c',
                                    checked: false,
                                    label: 'c)',
                                    labelWidth: '95%',
                                    labelAlign: 'right',
                                    id: 'answerc3'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    name : 'color',
                                    value: 'd',
                                    checked: false,
                                    label: 'd)',
                                    labelWidth: '95%',
                                    labelAlign: 'right',
                                    id: 'answerd4'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    name : 'false',
                                    value: 'e',
                                    checked: false,
                                    label: 'e)',
                                    labelWidth: '95%',
                                    labelAlign: 'right',
                                    id: 'answere5'
                                }
                                ]
                            }

                        ]

                    }
                ]

            },
        ]
    },

});